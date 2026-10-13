---
title: Claude Code 快捷鍵與指令筆記
tags: Claude Code, CLI, 快捷鍵, 指令
lang: zh-tw
---

# Claude Code 快捷鍵與指令筆記

> Claude Code 是 Anthropic 推出的終端機 AI 工具。它會讀懂你的程式碼庫、在你同意後修改檔案、並直接在終端機執行指令。
> 這份筆記是把 `/help` 畫面中的三個分頁（一般、內建指令、自訂指令）翻成台灣用語並逐條說明，方便貼到 HackMD 當作隨手查的小抄。

[TOC]

---

## 一、快捷鍵（Shortcuts）

:::info
下面的「ctrl」在 macOS 上就是 `control` 鍵；「alt」在 macOS 上是 `option` 鍵。
:::

### 1. 輸入列的觸發字元

| 按鍵 | 用途 | 說明 |
|:--|:--|:--|
| `!` | 進入 Shell 模式 | 在輸入列最前面打 `!`，後面接的內容會直接當成 shell 指令執行，不會送給 Claude。例如 `!ls -la`、`!git status`。 |
| `/` | 呼叫指令 | 打 `/` 會跳出指令清單，可以選內建指令（如 `/help`、`/clear`）或自訂指令。 |
| `@` | 引用檔案路徑 | 打 `@` 後會自動補齊專案內的檔案路徑，等於把那個檔案「附加」到這次對話，讓 Claude 直接讀。例如 `@src/app.js 幫我看這段`。 |
| `/btw` | 問旁枝問題 | 「順便問一下」。可以在不打斷目前主任務的情況下插一個小問題，問完回到原本的工作流程。 |

### 2. 編輯與控制

| 按鍵 | 用途 | 說明 |
|:--|:--|:--|
| `esc` 連按兩下 | 清空輸入列 | 快速把還沒送出的文字全部清掉。 |
| `shift` + `tab` | 切換「自動接受編輯」 | 開啟後 Claude 改檔案不再逐一問你是否同意，適合你已經信任它在做的事情時使用。再按一次可切回。 |
| `ctrl` + `o` | 切換詳細輸出 | 顯示 / 隱藏工具呼叫的完整內容（例如實際執行的指令、檔案 diff）。 |
| `ctrl` + `t` | 切換任務清單 | 顯示 / 隱藏目前的任務（Tasks）面板，看 Claude 正在跑哪些背景工作。 |
| `\` + `Enter` | 換行 | 在輸入列打反斜線再按 Enter 可以換行而不送出，方便寫多行提示。 |
| `ctrl` + `shift` + `_` | 復原 | 復原上一步在輸入列的編輯。 |
| `ctrl` + `z` | 暫停（suspend） | 把 Claude Code 丟到背景，回到 shell。之後用 `fg` 可以叫回來（這是 Unix 慣例）。 |
| `ctrl` + `v` | 貼上圖片 | 從剪貼簿貼圖片進對話，Claude 可以直接看圖（截圖、設計稿、錯誤畫面都行）。 |
| `alt` + `p` | 切換模型 | 快速在可用的模型之間切換（例如 Opus / Sonnet / Haiku）。 |
| `ctrl` + `s` | 暫存提示（stash prompt） | 把正在打的提示先收起來，之後再拿回來繼續寫。類似 `git stash` 的概念。 |
| `ctrl` + `g` | 用 `$EDITOR` 編輯 | 把輸入列的內容丟到你設定的編輯器（vim、nano、VS Code 等）編輯，存檔關閉後內容會回到輸入列。適合寫很長的提示。 |
| `/keybindings` | 自訂快捷鍵 | 開啟快捷鍵設定，可以改成自己習慣的組合。 |

:::success
**最常用的三個**
1. `@` 引用檔案 → 讓 Claude 有上下文。
2. `!` 跑指令 → 不用離開 Claude Code 就能看 git 狀態、跑測試。
3. `shift + tab` → 自動接受編輯，加速重構。
:::

---

## 二、內建指令（Default commands）

:::warning
`/help` 畫面只列出前幾個（到 `/bug` 為止），下面照畫面上的順序說明。
:::

| 指令 | 中文說明 |
|:--|:--|
| `/add-dir` | **新增工作目錄**。預設 Claude 只看你啟動時所在的資料夾；用這個指令可以把另一個資料夾也加進來，一次操作多個專案。 |
| `/advisor` | **顧問模式**。讓 Claude 在關鍵時刻（例如做重大設計決定時）去請教一個更強的模型，平常還是用較快的模型跑。 |
| `/artifact-capabilities` | **Artifact 執行階段能力**。說明已發佈的 Artifact 網頁可以被授予哪些靜態 HTML 做不到的能力，例如讀取即時資料、記住使用者操作、跨瀏覽者共享狀態、儲存檔案等。 |
| `/artifact-diagramming` | **Artifact 畫圖指南**。教你什麼時候該用圖、怎麼畫出能呈現真實機制的圖，以及讓內嵌 SVG 在深色 / 淺色主題都清楚的技巧。 |
| `/artifacts` | **瀏覽 Artifact**。列出你發佈過的以及別人分享給你的 Artifact 網頁。 |
| `/auto-mode-setup` | **設定自動模式**。讓 Claude 了解你的環境（哪些指令安全、哪些需要確認），並可微調自動模式的規則。 |
| `/autocompact` | **設定自動摘要門檻**。對話太長時 Claude 會自動把前面的內容壓縮成摘要；這裡可以設定「上下文用到幾成滿」就觸發。 |
| `/autofix-pr` | **監控並自動修 PR**。訂閱目前 PR 的 CI 結果和審查留言，有紅燈或建議就自動處理。 |
| `/background` | **丟到背景**。把這個 session 放到背景執行，把終端機還給你。 |
| `/batch` | **大規模批次修改**。先研究並規劃一個大範圍的變更，然後拆成 5 到 30 個獨立的 worktree 平行執行。適合跨很多檔案的重構。 |
| `/branch` | **對話分支**。在目前這個時間點把對話「分岔」出一條新支線，可以試不同方向而不影響原本的對話。 |
| `/btw` | **旁枝問題**。同前面快捷鍵說明，問個小問題不打斷主任務。 |
| `/bug` | **回報問題**。回報 Claude Code 的 bug，或把這段對話分享給 Anthropic。 |

:::info
更多內建指令請看官方文件：<https://code.claude.com/docs/en/overview>
:::

---

## 三、自訂指令（Custom commands）

這些是以 **skill（技能）** 形式安裝的擴充指令，名稱前面帶 `anthropic-skills:` 前綴代表來自 Anthropic 官方的技能包。畫面上列出的如下：

| 指令 | 中文說明 |
|:--|:--|
| `/anthropic-skills:algorithmic-art` | **演算法藝術**。用 p5.js 搭配固定亂數種子做生成藝術，可互動調整參數。 |
| `/anthropic-skills:brand-guidelines` | **Anthropic 品牌規範**。把 Anthropic 官方的配色與字體套用到任何產出物上。 |
| `/anthropic-skills:built-in-browser` | **內建瀏覽器**。使用 Claude 桌面版 App 內建的瀏覽器窗格前要先讀的說明。 |
| `/anthropic-skills:canvas-design` | **視覺設計**。製作海報、藝術作品等靜態設計，輸出 `.png` 或 `.pdf`。 |
| `/anthropic-skills:chrome-browser` | **Claude in Chrome**。使用 Chrome 瀏覽器擴充功能、在你自己的 Chrome 裡操作網頁前要先讀的說明。 |
| `/anthropic-skills:computer-use` | **電腦操作**。讓 Claude 截圖並操作你電腦上的桌面 App 前要先讀的說明。 |
| `/anthropic-skills:deep-research` | **深度研究**。需要跨多個來源查資料、比較方案、分析趨勢，並整理成完整報告時使用。 |
| `/anthropic-skills:doc-coauthoring` | **共同撰寫文件**。用結構化的流程一起寫技術規格、提案、決策文件。 |
| `/anthropic-skills:docs` | **Claude 文件（Docs）**。建立可以分享、留言、共同編輯的線上文件，可匯出成 Word、PDF、Markdown 或 Google 文件。 |
| `/anthropic-skills:docx` | **Word 文件**。建立、讀取、編輯 `.docx` 檔案，支援追蹤修訂與註解。 |
| `/anthropic-skills:fb-video-to-notion` | **短影片轉 Notion 筆記**。貼 Facebook、Instagram、YouTube Shorts、TikTok 連結，自動下載音訊、用本機 Whisper 轉文字、整理成重點筆記並推送到 Notion。 |
| `/anthropic-skills:google-workspace` | **Google Workspace**。要建立或修改 Google 文件、試算表、簡報前先讀的說明。 |
| `/anthropic-skills:import-memory` | **匯入記憶**。把其他 AI 助理匯出的記憶資料匯入 Claude 的記憶中。 |

:::info
畫面上的自訂指令清單只顯示到 `/anthropic-skills:import-memory`，實際還有更多（例如 `media-toolkit`、`pdf`、`pptx`、`xlsx` 等）。在 Claude Code 裡打 `/` 就能看到完整清單。
:::

---

## 四、一分鐘上手流程

1. 在專案資料夾打 `claude` 啟動。
2. 用 `@檔名` 把要討論的檔案帶進來。
3. 直接用白話描述要做什麼，Claude 會提出修改並問你是否同意。
4. 覺得它做得對，就按 `shift + tab` 開啟自動接受，加快速度。
5. 想看 git 狀態或跑測試，直接 `!git status`、`!npm test`。
6. 對話太長時打 `/compact` 或讓 `/autocompact` 自動處理。
7. 需要特定工作流程時打 `/` 挑一個 skill。

---

## 參考資料

- Claude Code 官方文件：<https://code.claude.com/docs/en/overview>
- 鍵盤快捷鍵自訂：在 Claude Code 中輸入 `/keybindings`
