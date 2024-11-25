# Web Music Player | 缃戦〉闊充箰鎾�鏀惧櫒

A modern, responsive web music player with synchronized lyrics display and beautiful UI effects.

涓€涓�鐜颁唬鍖栫殑鍝嶅簲寮忕綉椤甸煶涔愭挱鏀惧櫒锛屽叿鏈夋瓕璇嶅悓姝ユ樉绀哄拰浼樼編鐨勭晫闈㈡晥鏋溿€�

## Features | 鍔熻兘鐗圭偣

- 馃幍 Clean, modern UI with responsive design
- 馃帹 Dynamic background effects using album art
- 馃摑 Synchronized lyrics display with auto-scroll
- 馃帤锔� Draggable progress bar with time display
- 馃攧 Smooth animations and transitions
- 馃摫 Mobile-friendly layout
- 馃洜锔� Robust error handling and fallbacks

- 馃幍 娓呮柊鐜颁唬鐨勫搷搴斿紡鐣岄潰璁捐��
- 馃帹 涓撹緫灏侀潰浣滀负鍔ㄦ€佽儗鏅�鏁堟灉
- 馃摑 姝岃瘝鍚屾�ユ樉绀哄拰鑷�鍔ㄦ粴鍔�
- 馃帤锔� 鍙�鎷栨嫿鐨勮繘搴︽潯鍜屾椂闂存樉绀�
- 馃攧 娴佺晠鐨勫姩鐢诲拰杩囨浮鏁堟灉
- 馃摫 閫傞厤绉诲姩绔�甯冨眬
- 馃洜锔� 鍋ュ．鐨勯敊璇�澶勭悊鍜屽悗澶囨柟妗�

## Setup | 瀹夎�呰�剧疆

1. Clone the repository | 鍏嬮殕浠撳簱
```bash
git clone <repository-url>
```

2. Place your music files in the assets folder | 灏嗛煶涔愭枃浠舵斁鍏� assets 鏂囦欢澶�:
```
assets/
  鈹溾攢鈹€ song1.mp3
  鈹溾攢鈹€ song1.jpg
  鈹斺攢鈹€ song1.json
```

3. Serve with a static file server | 浣跨敤闈欐€佹枃浠舵湇鍔″櫒杩愯��:
```bash
# Example using Python
python -m http.server 8080
```

## Usage | 浣跨敤鏂规硶

### Audio Files | 闊抽�戞枃浠�
Place your MP3 files in the `assets` folder with corresponding JSON metadata files:

灏� MP3 鏂囦欢鍜屽�瑰簲鐨� JSON 鍏冩暟鎹�鏂囦欢鏀惧湪 `assets` 鏂囦欢澶逛腑锛�

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

### Album Art | 涓撹緫灏侀潰
Supported formats: JPG, JPEG, PNG, WebP
鏀�鎸佺殑鏍煎紡锛欽PG銆丣PEG銆丳NG銆乄ebP

Name your image files to match the song ID:
鍥剧墖鏂囦欢鍚嶉渶瑕佷笌姝屾洸 ID 鍖归厤锛�
```
song1.mp3
song1.jpg
song1.json
```

## File Structure | 鏂囦欢缁撴瀯

```
/
鈹溾攢鈹€ index.html          # Main HTML file | 涓� HTML 鏂囦欢
鈹溾攢鈹€ styles/
鈹�   鈹斺攢鈹€ main.css       # Styles | 鏍峰紡鏂囦欢
鈹溾攢鈹€ scripts/
鈹�   鈹斺攢鈹€ player.js      # Player logic | 鎾�鏀惧櫒閫昏緫
鈹斺攢鈹€ assets/
    鈹溾攢鈹€ song1.mp3      # Audio file | 闊抽�戞枃浠�
    鈹溾攢鈹€ song1.jpg      # Album art | 涓撹緫灏侀潰
    鈹斺攢鈹€ song1.json     # Song metadata | 姝屾洸鍏冩暟鎹�
```

## Technical Details | 鎶€鏈�缁嗚妭

- Pure JavaScript/HTML/CSS implementation
- CSS custom properties for theming
- Responsive design with mobile-first approach
- Graceful fallbacks for missing assets
- Event-driven architecture for player controls

- 绾� JavaScript/HTML/CSS 瀹炵幇
- 浣跨敤 CSS 鑷�瀹氫箟灞炴€у疄鐜颁富棰�
- 绉诲姩浼樺厛鐨勫搷搴斿紡璁捐��
- 浼橀泤鐨勮祫婧愮己澶卞�勭悊
- 鍩轰簬浜嬩欢椹卞姩鐨勬挱鏀惧櫒鎺у埗鏋舵瀯

## License | 璁稿彲璇�

MIT


