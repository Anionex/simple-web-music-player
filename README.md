# Web Music Player | 网页音乐播放器

A modern, responsive web music player with synchronized lyrics display and beautiful UI effects.

一个现代化的响应式网页音乐播放器，具有歌词同步显示和优美的界面效果。

## Features | 功能特点

- 🎵 Clean, modern UI with responsive design
- 🎨 Dynamic background effects using album art
- 📝 Synchronized lyrics display with auto-scroll
- 🎚️ Draggable progress bar with time display
- 🔄 Smooth animations and transitions
- 📱 Mobile-friendly layout
- 🛠️ Robust error handling and fallbacks

- 🎵 清新现代的响应式界面设计
- 🎨 专辑封面作为动态背景效果
- 📝 歌词同步显示和自动滚动
- 🎚️ 可拖拽的进度条和时间显示
- 🔄 流畅的动画和过渡效果
- 📱 适配移动端布局
- 🛠️ 健壮的错误处理和后备方案

## Setup | 安装设置

1. Clone the repository | 克隆仓库
```bash
git clone <repository-url>
```

2. Place your music files in the assets folder | 将音乐文件放入 assets 文件夹:
```
assets/
  ├── song1.mp3
  ├── song1.jpg
  └── song1.json
```

3. Serve with a static file server | 使用静态文件服务器运行:
```bash
# Example using Python
python -m http.server 8080
```

## Usage | 使用方法

### Audio Files | 音频文件
Place your MP3 files in the `assets` folder with corresponding JSON metadata files:

将 MP3 文件和对应的 JSON 元数据文件放在 `assets` 文件夹中：

```json
{
    "title": "Song Title",
    "artist": "Artist Name",
    "album": "Album Name",
    "lyrics": [
        {"time": 0, "text": "First line"},
        {"time": 5, "text": "Second line"}
    ]
}
```

### Album Art | 专辑封面
Supported formats: JPG, JPEG, PNG, WebP
支持的格式：JPG、JPEG、PNG、WebP

Name your image files to match the song ID:
图片文件名需要与歌曲 ID 匹配：
```
song1.mp3
song1.jpg
song1.json
```

## File Structure | 文件结构

```
/
├── index.html          # Main HTML file | 主 HTML 文件
├── styles/
│   └── main.css       # Styles | 样式文件
├── scripts/
│   └── player.js      # Player logic | 播放器逻辑
└── assets/
    ├── song1.mp3      # Audio file | 音频文件
    ├── song1.jpg      # Album art | 专辑封面
    └── song1.json     # Song metadata | 歌曲元数据
```

## Technical Details | 技术细节

- Pure JavaScript/HTML/CSS implementation
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Graceful fallbacks for missing assets
- Event-driven architecture for player controls

- 纯 JavaScript/HTML/CSS 实现
- 使用 CSS 自定义属性实现主题
- 移动优先的响应式设计
- 优雅的资源缺失处理
- 基于事件驱动的播放器控制架构

## License | 许可证

MIT


