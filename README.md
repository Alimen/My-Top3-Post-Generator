# My Top3 貼圖生成器

本專案是一個適用於定期活動企劃「閱聽作品 Top3」的社群貼文圖片生成器。目標是讓活動主辦人員能以簡單的操作，快速製作統一規格的 Top3 分享圖。

使用者可以自訂上半部的文字、字型與配色，搭配下半部三張精選圖片，製作 960 × 960 的正方形圖片。專案以前端為主，使用 React 建立即時編輯介面，並透過 Canvas 合成與匯出圖片；所有上傳素材皆在瀏覽器端處理，不需上傳至伺服器。

## 使用

請透過 GitHub Pages 直接存取頁面：  
👉 [Demo Link](https://alimen.github.io/My-Top3-Post-Generator/)

主要功能：

- 自訂最多五行文字，調整字型、大小、字重、字距與對齊方式。
- 自訂文字區的背景顏色、文字顏色及上下區塊比例。
- 上傳三張 JPG、PNG 或 WEBP 圖片，調整縮放與水平、垂直位置。
- 快速交換圖片順序，並即時預覽輸出結果。
- 匯出 960 × 960 的 JPG 圖檔。

## 本機開發

```bash
npm install
npm run dev
```

開發伺服器預設運行於 `http://localhost:3000`。

其他常用指令：

```bash
npm run lint
npm run build
npm run preview
```

## 開發環境

- **React 19**：主要 UI 框架，使用 Function Components 與 Hooks 管理編輯狀態。
- **Vite 6**：前端開發伺服器與打包工具。
- **TypeScript 5**：提供型別定義與編譯檢查。
- **Tailwind CSS 4**：負責響應式版面與介面樣式。
- **Canvas API**：合成文字與圖片，產生固定尺寸的輸出圖檔。
- **lucide-react**：提供上傳、下載、文字對齊與圖片調整等介面圖示。

本專案使用 Google AI Studio 建立基礎架構，後續再由 OpenAI Codex 與人力協作而成。

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.

This project uses third-party open-source dependencies, each of which remains under its own license.  
Notable runtime dependencies include React (MIT), React DOM (MIT), and lucide-react (ISC).
