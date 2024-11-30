class MusicPlayer {
    constructor() {
        this.audio = document.getElementById('audio-player');
        this.playPauseBtn = document.querySelector('.play-pause');
        this.progressBar = document.querySelector('.progress-bar');
        this.progress = document.querySelector('.progress');
        this.progressHandle = document.querySelector('.progress-handle');
        this.currentTimeEl = document.querySelector('.current-time');
        this.durationEl = document.querySelector('.duration');
        this.coverArt = document.getElementById('cover-art');
        this.songTitle = document.querySelector('.song-title');
        this.artistName = document.querySelector('.artist-name');
        this.albumName = document.createElement('span');
        this.albumName.className = 'album-name';
        document.querySelector('.song-info').appendChild(this.albumName);
        
        this.defaultCover = 'assets/default-cover.jpg';
        this.fallbackCover = 'data:image/svg+xml,' + encodeURIComponent(`
            <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <rect width="100%" height="100%" fill="#2d2d2d"/>
                <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle">
                    无法加载封面
                </text>
            </svg>
        `);
        
        this.currentLyricIndex = -1;
        this.lyrics = [];
        
        this.isDragging = false;
        
        this._onMouseDown = (e) => {
            e.preventDefault();
            this.isDragging = true;
            this.updateProgressFromEvent(e);
            document.addEventListener('mousemove', this._onMouseMove);
            document.addEventListener('mouseup', this._onMouseUp);
        };
        
        this._onMouseMove = (e) => {
            if (this.isDragging) {
                e.preventDefault();
                this.updateProgressFromEvent(e);
            }
        };
        
        this._onMouseUp = () => {
            this.isDragging = false;
            document.removeEventListener('mousemove', this._onMouseMove);
            document.removeEventListener('mouseup', this._onMouseUp);
        };
        
        this.removeProgressListeners();
        this.addProgressListeners();
        
        this.initializeEvents();
        this.loadSong();
    }
    
    initializeEvents() {
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.audio.addEventListener('timeupdate', () => {
            if (!this.isDragging) {
                this.updateProgress();
            }
            this.updateLyrics();
        });
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('ended', () => this.onSongEnd());
        this.coverArt.addEventListener('error', (e) => this.handleImageError(e));
    }
    
    async loadSong() {
        const urlParams = new URLSearchParams(window.location.search);
        const songId = urlParams.get('song') || 'song1';
        
        try {
            const response = await fetch(`assets/${songId}.json`);
            if (!response.ok) throw new Error('歌曲信息加载失败');
            
            const songInfo = await response.json();
            this.updateSongInfo(songInfo);
            this.lyrics = songInfo.lyrics || [];
            
            this.initializeLyrics();
            
            this.audio.src = `assets/${songId}.mp3`;
        } catch (e) {
            console.error('加载歌曲信息失败:', e);
            this.handleAudioError(e);
        }
        
        this.loadImageWithFallback(songId);
    }
    
    initializeLyrics() {
        const lyricsContainer = document.querySelector('.lyrics');
        lyricsContainer.innerHTML = '';
        
        this.lyrics.forEach((lyric, index) => {
            const p = document.createElement('p');
            p.textContent = lyric.text;
            p.className = 'lyric-line';
            p.dataset.index = index;
            lyricsContainer.appendChild(p);
        });
    }
    
    updateSongInfo(songInfo) {
        this.songTitle.textContent = songInfo.title || '未知歌曲';
        this.artistName.textContent = songInfo.artist || '未知艺术家';
        this.albumName.textContent = songInfo.album || '未知专辑';
    }
    
    updateLyrics() {
        if (!this.lyrics.length) return;
        
        const currentTime = this.audio.currentTime;
        
        let newIndex = this.currentLyricIndex;
        
        while (newIndex + 1 < this.lyrics.length && 
               this.lyrics[newIndex + 1].time <= currentTime) {
            newIndex++;
        }
        
        while (newIndex >= 0 && this.lyrics[newIndex].time > currentTime) {
            newIndex--;
        }
        
        if (newIndex !== this.currentLyricIndex) {
            const lyricsContainer = document.querySelector('.lyrics');
            
            const oldCurrent = lyricsContainer.querySelector('.current');
            if (oldCurrent) {
                oldCurrent.classList.remove('current');
            }
            
            const newCurrent = lyricsContainer.querySelector(`[data-index="${newIndex}"]`);
            if (newCurrent) {
                newCurrent.classList.add('current');
                
                requestAnimationFrame(() => {
                    newCurrent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                });
            }
            
            this.currentLyricIndex = newIndex;
        }
    }
    
    async loadImageWithFallback(songId) {
        const imageFormats = ['jpg', 'jpeg', 'png', 'webp'];
        let loaded = false;

        for (const format of imageFormats) {
            try {
                await this.tryLoadImage(`assets/${songId}.${format}`);
                loaded = true;
                break;
            } catch (e) {
                continue;
            }
        }

        if (!loaded) {
            try {
                await this.tryLoadImage(this.defaultCover);
            } catch {
                this.coverArt.src = this.fallbackCover;
                this.updateBackground(this.fallbackCover);
            }
        }
    }
    
    tryLoadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.coverArt.src = src;
                this.updateBackground(src);
                resolve();
            };
            img.onerror = reject;
            img.src = src;
        });
    }
    
    updateBackground(src) {
        document.querySelector('.background-overlay').style.backgroundImage = `url(${src})`;
    }
    
    handleAudioError(e) {
        console.error('音频加载失败:', e);
        this.showError('无法加载音频文件');
        this.disablePlayback();
    }
    
    handleImageError(e) {
        console.error('图片加载失败:', e);
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        const lyricsContainer = document.querySelector('.lyrics');
        lyricsContainer.innerHTML = '';
        lyricsContainer.appendChild(errorDiv);
    }
    
    disablePlayback() {
        this.playPauseBtn.disabled = true;
        this.progressBar.style.pointerEvents = 'none';
        this.progressBar.style.opacity = '0.5';
    }
    
    getSongTitle(songId) {
        return songId.charAt(0).toUpperCase() + songId.slice(1);
    }
    
    togglePlay() {
        if (this.audio.paused) {
            this.audio.play();
            this.playPauseBtn.classList.add('playing');
        } else {
            this.audio.pause();
            this.playPauseBtn.classList.remove('playing');
        }
    }
    
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const pos = this.audio.currentTime / this.audio.duration;
            this.updateProgressUI(pos);
        }
    }
    
    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }
    
    removeProgressListeners() {
        this.progressBar.removeEventListener('mousedown', this._onMouseDown);
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }
    
    addProgressListeners() {
        this.progressBar.addEventListener('mousedown', this._onMouseDown);
    }
    
    updateProgressFromEvent(e) {
        if (!this.audio.duration) return;
        
        const rect = this.progressBar.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        
        this.updateProgressUI(pos);
        
        this.isDragging = true;
        this.audio.currentTime = pos * this.audio.duration;
    }
    
    updateProgressUI(pos) {
        this.progress.style.width = `${pos * 100}%`;
        this.progressHandle.style.left = `${pos * 100}%`;
        this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
    }
    
    onSongEnd() {
        this.playPauseBtn.classList.remove('playing');
        this.progress.style.width = '0%';
        this.progressHandle.style.left = '0%';
    }
}

const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #ff4444;
        padding: 20px;
        text-align: center;
        background: rgba(255, 0, 0, 0.1);
        border-radius: 8px;
        margin: 20px 0;
    }
    
    button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .album-name {
        font-size: 1rem;
        color: var(--text-secondary);
        margin-top: 4px;
    }
    
    .lyric-line {
        padding: 8px 0;
        transition: all 0.3s ease;
        opacity: 0.6;
        transform: scale(0.95);
    }
    
    .lyric-line.current {
        opacity: 1;
        transform: scale(1);
        font-size: 1.2rem;
        color: var(--text-primary);
        font-weight: 500;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
}); 