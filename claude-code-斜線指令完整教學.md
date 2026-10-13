---
title: Claude Code 斜線指令完整教學（新手版）
tags: Claude Code, CLI, 斜線指令, Kali, 新手
lang: zh-tw
---

# Claude Code 斜線指令完整教學（新手版）

> 寫給在 Kali / Linux 終端機裡打 `claude` 進來，然後看到一大串 `/` 指令卻不知道從哪學起的人。
> 這份筆記的順序是：**先學怎麼自己探看 → 再學新手必會的 10 個 → 最後才是依情境分組的完整對照表**。不用一次全記，用到再回來查。
>
> 資料來源：官方指令清單 <https://code.claude.com/docs/en/commands>（2026-10 版本）。官方表格是照字母排的，這裡改成依「你想做什麼」來分組。

[TOC]

---

## 第 0 課：怎麼自己探看指令（最重要）

你不需要背任何東西，Claude Code 本身就有好幾個「查表」入口：

| 你想知道 | 做法 |
|:--|:--|
| 有哪些指令 | 在輸入列打 `/`，會跳出選單。用 `↑` `↓` 移動、`Enter` 執行、`Tab` 接受補齊。 |
| 找特定指令 | 打 `/` 再接幾個字母就能篩選，例如 `/mo` 會剩下 `/model`、`/mobile`。篩選時會忽略 `-`、`:`、`_`，所以打 `/adddir` 也找得到 `/add-dir`。 |
| 看鍵盤快捷鍵 | 輸入列空白時按 `?`，會跳出快捷鍵說明面板。 |
| 看完整說明 | `/help` |
| 有哪些技能（skill） | `/skills`，可以打字篩選，按 `t` 依耗用 token 排序。 |
| 有哪些 MCP 伺服器 | `/mcp` |
| 現在的版本、模型、帳號 | `/status` |
| 現在的設定 | `/config` |
| 互動式教學 | `/powerup`，有動畫示範各功能。 |
| 離開 Claude、在 shell 看 | `claude --help`（注意：官方說這裡列的旗標不完整） |

:::success
**打錯字也沒關係**：打錯的指令選單不會亮，按 Enter 會顯示 `Unknown command`。選單通常還是會列出相近的指令，用方向鍵選一個就好。
:::

:::info
**為什麼有些指令你看不到？** 指令清單會依你的平台、方案（免費 / Pro / Max / API）、環境而不同。看不到的指令代表你這個環境用不到，不是壞掉。
:::

---

## 第 1 課：新手第一週必會的 10 個

照這個順序學，每一個都是你一定會碰到的情境。

| # | 指令 | 什麼時候用 | 一句話說明 |
|:--|:--|:--|:--|
| 1 | `/help` | 迷路時 | 顯示說明和可用指令。 |
| 2 | `/model` | 想換模型 | 不帶參數會開選單讓你挑（Opus / Sonnet / Haiku 等）。選完會存成預設；按 `s` 只在這次 session 換。 |
| 3 | `/clear` | 要換一個完全無關的新任務 | 清空對話重新開始。舊對話還在，可以用 `/resume` 找回來。別名：`/new`、`/reset`。 |
| 4 | `/compact` | 對話太長、Claude 開始忘東忘西 | 把前面的對話壓成摘要，釋放空間。可以加說明，例如 `/compact 保留跟登入功能相關的部分`。 |
| 5 | `/resume` | 昨天做到一半，今天想接著做 | 開選單選一個舊對話繼續。別名：`/continue`。 |
| 6 | `/init` | 第一次在某個專案用 Claude | 幫專案產生 `CLAUDE.md`，讓 Claude 記住這個專案的規則和慣例。 |
| 7 | `/permissions` | 它一直問「可以執行嗎？」很煩 | 管理「允許 / 詢問 / 拒絕」的規則，例如允許所有 `git` 指令不用再問。 |
| 8 | `/diff` | 想看它到底改了什麼 | 顯示目前工作目錄的變更，包含 Claude 改的部分。 |
| 9 | `/rewind` | 它改壞了，想退回 | 把對話或程式碼倒回某個時間點。別名：`/undo`、`/checkpoint`。 |
| 10 | `/usage` | 想知道用了多少額度 | 顯示這次的花費、方案額度和活動。別名：`/cost`、`/stats`。 |

:::warning
**跟 `/` 指令搭配的三個非指令技巧**
- `@檔名`：把檔案帶進對話，例如 `@src/main.py 這段為什麼會報錯`。
- `!指令`：直接跑 shell 指令，例如 `!ls -la`、`!nmap --version`，不會送給 Claude。
- `shift + tab`：切換權限模式（一般 → 自動接受編輯 → 計畫模式）。
:::

---

## 第 2 課：依情境分組的完整對照表

### A. 開始與設定

| 指令 | 說明 |
|:--|:--|
| `/init` | 為專案建立 `CLAUDE.md`。 |
| `/login` / `/logout` | 登入 / 登出 Anthropic 帳號。 |
| `/config` | 開啟設定頁面，或直接設值，例如 `/config theme=dark`。別名：`/settings`。 |
| `/status` | 看版本、模型、帳號、連線狀態。Claude 正在回覆時也能用。 |
| `/model [模型]` | 切換模型。 |
| `/effort [low\|medium\|high\|xhigh\|max\|auto]` | 設定思考用力程度。`/effort status` 顯示目前值。 |
| `/fast [on\|off]` | 開關快速模式（用 Opus 但輸出更快）。 |
| `/add-dir <路徑>` | 加入另一個工作目錄。 |
| `/cd <路徑>` | 把 session 搬到另一個目錄，對話保留。 |
| `/memory` | 編輯 `CLAUDE.md`、開關自動記憶、查看記憶內容。 |
| `/import [codex\|gemini\|cursor]` | 把其他 AI 工具的設定搬過來。 |
| `/doctor` | 檢查安裝、設定、擴充是否正常，會提議修正。別名：`/checkup`。 |

### B. 對話管理

| 指令 | 說明 |
|:--|:--|
| `/clear [名稱]` | 開新對話。別名：`/new`、`/reset`。 |
| `/compact [說明]` | 壓縮對話成摘要。 |
| `/autocompact [auto\|token數]` | 設定自動壓縮的門檻，例如 `/autocompact 500k`。 |
| `/context` | 用彩色格子顯示上下文用了多少，附優化建議。 |
| `/resume [session]` | 恢復舊對話。別名：`/continue`。 |
| `/rename [名稱]` | 幫這個 session 取名字，之後比較好找。 |
| `/branch [名稱]` | 從目前的對話分岔出另一條，試不同做法。 |
| `/fork [提示]` | 把對話複製成一個背景 session，你留在原本這邊。 |
| `/rewind` | 倒回對話或程式碼。別名：`/undo`、`/checkpoint`。 |
| `/btw [問題]` | 問旁枝問題，不會進入對話歷史。 |
| `/recap` | 產生一行這個 session 的摘要。 |
| `/export [檔名]` | 把對話匯出成純文字檔或剪貼簿。 |
| `/copy [N]` | 複製最後一則（或倒數第 N 則）回覆到剪貼簿。 |
| `/exit` | 離開。別名：`/quit`。 |

### C. 規劃與做事方式

| 指令 | 說明 |
|:--|:--|
| `/plan [描述]` | 進入「計畫模式」：Claude 先研究、提計畫，你核准後才動手。 |
| `/goal [條件\|clear]` | 設一個目標，Claude 會跨回合持續做到達成為止。`/goal clear` 取消。 |
| `/advisor [模型\|off]` | 開啟顧問功能，在關鍵時刻請教另一個更強的模型。 |
| `/subtask <任務>` | 開一個分支子代理去做某件事，結果回傳到這裡。 |
| `/loop [間隔] [提示]` | 定時重複執行某個提示，例如 `/loop 5m 檢查部署狀態`。 |
| `/schedule [描述]` | 建立或列出雲端排程任務。別名：`/routines`。 |

### D. 程式碼審查與交付

| 指令 | 說明 |
|:--|:--|
| `/diff` | 看工作目錄的變更。 |
| `/code-review [等級] [--fix] [目標]` | 審查目前的 diff 或指定 PR / 分支，找正確性 bug。`--fix` 會直接修。別名：`/review`。 |
| `/simplify [目標]` | 審查改過的程式碼，做重用、簡化、效率上的整理（不找 bug）。 |
| `/security-review` | 對比 origin 預設分支，檢查這個分支的安全問題。 |
| `/ultrareview [PR\|分支]` | 雲端多代理深度審查。建議改用 `/code-review ultra`。 |
| `/verify` | 實際建置並執行 app 來確認改動有效。 |
| `/run` | 啟動並操作專案的 app 看改動效果。 |
| `/autofix-pr [提示]` | 開雲端 session 監看目前分支的 PR，自動修 CI 失敗和審查留言。需要 `gh`。 |

### E. 權限與安全

| 指令 | 說明 |
|:--|:--|
| `/permissions` | 管理允許 / 詢問 / 拒絕規則和工作目錄。別名：`/allowed-tools`。 |
| `/fewer-permission-prompts` | 掃描你的使用紀錄，自動產生一份允許清單寫進專案設定，減少詢問。 |
| `/sandbox` | 開關沙箱模式（限支援的平台）。 |
| `/auto-mode-setup` | 設定自動模式要認識的環境（Pro / Max / Team）。 |
| `/privacy-settings` | 隱私設定（Pro / Max）。 |
| `/hooks` | 查看 hook（事件觸發腳本）設定。 |
| `/update-config [描述]` | 用白話描述修改 `settings.json`，例如允許規則、環境變數、hook。 |

### F. 擴充功能：技能、外掛、MCP

| 指令 | 說明 |
|:--|:--|
| `/skills` | 列出所有技能。 |
| `/reload-skills` | 重新掃描技能與指令目錄，不用重啟。 |
| `/skill-doctor` | 看每個技能佔多少上下文、用了幾次。 |
| `/plugin [子指令]` | 管理外掛：`list`、`install`、`enable`、`disable`。 |
| `/reload-plugins` | 重新載入外掛。 |
| `/mcp [reconnect\|enable\|disable]` | 管理 MCP 伺服器連線和 OAuth 登入。 |
| `/agents` | 子代理管理（現在是提示你直接請 Claude 管理或編輯 `.claude/agents/`）。 |
| `/list-agents` | 列出可以傳訊息的子代理、隊友和 session。別名：`/peers`。 |
| `/plugin-authoring` | 載入「寫 mod」的參考資料。 |

### G. 背景與平行工作

| 指令 | 說明 |
|:--|:--|
| `/background [提示]` | 把這個 session 丟到背景跑，把終端機還給你。別名：`/bg`。 |
| `/tasks` | 查看和管理背景工作（shell 和子代理）。別名：`/bashes`。 |
| `/stop` | 停止你目前附著的背景 session。 |
| `/batch <指令>` | 大規模平行修改：拆成 5 到 30 個單位，各自在獨立 worktree 跑。 |
| `/workflows` | 開啟工作流程進度畫面。 |
| `/teleport` | 把雲端 session 拉進這個終端機。別名：`/tp`。 |
| `/remote-control` | 讓這個 session 可以從 claude.ai 遠端操控。別名：`/rc`。 |
| `/remote-env` | 選雲端 session 預設用的環境。 |
| `/web-setup` | 用本機 `gh` 的憑證連接 GitHub 給雲端 session 用。 |

### H. 介面與外觀

| 指令 | 說明 |
|:--|:--|
| `/theme` | 換配色主題（含自動、色弱友善、ANSI、自訂）。 |
| `/color [顏色]` | 設定提示列的顏色。 |
| `/tui [default\|fullscreen]` | 切換終端機渲染模式。 |
| `/focus` | 切換專注檢視（只顯示最後提示、工具摘要、最終回覆）。限全螢幕模式。 |
| `/scroll-speed` | 調滑鼠滾輪速度。限全螢幕模式。 |
| `/statusline` | 設定狀態列。 |
| `/keybindings` | 開啟快捷鍵設定檔。 |
| `/terminal-setup` | 在 VS Code、Cursor、Alacritty、Zed 安裝 Shift+Enter 換行。 |
| `/output-style [樣式]` | 列出或切換輸出風格。 |
| `/voice [hold\|tap\|off]` | 語音輸入（需 claude.ai 帳號）。 |
| `/vim` | **已移除**（v2.1.92）。改用 `/config` 裡的 Editor mode。 |

### I. 帳號、額度與診斷

| 指令 | 說明 |
|:--|:--|
| `/usage` | 花費、額度、活動。別名：`/cost`、`/stats`。 |
| `/usage-credits` | 設定或向管理員申請額外額度。 |
| `/rate-limit-options` | 碰到用量上限時的選項。 |
| `/upgrade` | 開升級方案頁面。 |
| `/passes` | 分享一週免費 Claude Code（符合資格才顯示）。 |
| `/debug [描述]` | 開啟除錯記錄並從 log 找問題。 |
| `/heapdump` | 寫出記憶體快照診斷用。選單不顯示，要打全名。 |
| `/insights` | 產生最近 session 的 HTML 報告（雲端 session 不支援）。 |
| `/release-notes` | 看版本更新記錄。 |
| `/bug [描述]` / `/feedback` | 回報 bug 或送意見。別名：`/share`。 |

### J. 整合其他 App

| 指令 | 說明 |
|:--|:--|
| `/ide` | 管理 IDE 整合。 |
| `/desktop` | 把 session 接到 Claude 桌面版。別名：`/app`。 |
| `/mobile` | 顯示 QR code 開手機 App。別名：`/ios`、`/android`。 |
| `/chrome` / `/claude-in-chrome [任務]` | 設定或使用 Claude in Chrome 做瀏覽器任務。 |
| `/install-github-app` | 幫 GitHub repo 安裝 Claude GitHub App。 |
| `/install-slack-app` | 安裝 Claude Slack App。 |
| `/artifacts` | 列出你的 Artifact 網頁。 |
| `/design` / `/slides` / `/design-sync` / `/design-login` | 產生設計稿、投影片（限 Anthropic API）。 |
| `/setup-bedrock` / `/setup-vertex` | AWS Bedrock / Google Vertex 設定精靈（設了環境變數才顯示）。 |

### K. 內建技能型指令（打了會載入一份參考資料）

| 指令 | 說明 |
|:--|:--|
| `/deep-research <問題>` | 多來源網路研究，產出有引用的報告。 |
| `/dataviz` | 圖表設計指南。 |
| `/claude-api` | Claude API 與 Managed Agents 參考。 |
| `/artifact-capabilities` / `/artifact-diagramming` | Artifact 網頁的能力與畫圖指南。 |
| `/workflow-authoring` | 寫 workflow 腳本的參考。 |
| `/run-skill-generator` | 幫專案寫一個教 `/run` 怎麼啟動 app 的技能。 |
| `/team-onboarding` | 從最近 30 天的使用產生團隊上手指南。 |

### L. 純好玩

| 指令 | 說明 |
|:--|:--|
| `/powerup` | 互動式教學課程。 |
| `/radio` | 開 Claude FM lo-fi 電台。 |
| `/stickers` | 訂購貼紙。 |

---

## 第 3 課：看懂「自訂指令」的冒號命名

`/` 選單裡除了內建指令，還會混著技能、外掛和 MCP 提供的指令。名字裡有冒號的，冒號前面是「來源」：

| 長相 | 來源 | 例子 |
|:--|:--|:--|
| `/name` | 你自己或專案的技能、`.claude/commands/name.md` | `/deploy` |
| `/資料夾:name` | `.claude/commands/` 的子資料夾 | `/frontend:component` |
| `/外掛名:技能名` | 外掛提供 | `/engineering:code-review` |
| `/anthropic-skills:name` | 從 claude.ai 同步下來的官方技能 | `/anthropic-skills:docx` |

小技巧：
- 只打後半段也找得到，例如打 `/docx` 會找到 `/anthropic-skills:docx`。
- 可以串接：`/skill-a /skill-b 幫我做 XYZ` 會一次載入兩個技能。
- 改了技能檔案後打 `/reload-skills` 就生效，不用重開。

---

## 第 4 課：在 Kali 終端機啟動時的旗標

這些是在 shell 打 `claude` 的時候接在後面的，不是在 Claude 裡面打的：

```bash
claude                          # 一般啟動
claude --continue               # 接續這個目錄最近一次的對話（簡寫 -c）
claude --resume                 # 開選單挑舊對話（簡寫 -r）
claude --resume 專案名稱         # 直接恢復指定對話
claude --model sonnet           # 指定模型啟動（sonnet / opus / haiku / fable）
claude -p "解釋這個錯誤"         # 非互動模式：問完就退出
cat error.log | claude -p "幫我看這個 log"   # 把檔案餵進去
claude --permission-mode plan   # 用計畫模式啟動
claude --add-dir ~/other-proj   # 多加一個目錄
claude --safe-mode              # 關掉所有自訂設定來排錯
claude update                   # 更新版本
claude doctor                   # 在 shell 做安裝診斷（不進 session）
claude mcp                      # 管理 MCP 伺服器
claude --version                # 看版本
```

:::info
Linux 上官方文件寫的 `Option + 鍵` 都對應到 `Alt + 鍵`：
`Alt + P` 切模型、`Alt + T` 開關延伸思考、`Alt + O` 開關快速模式。
`Ctrl + R` 搜尋歷史提示、`Ctrl + Z` 暫停到背景（之後打 `fg` 叫回來）。
:::

---

## 建議的學習路徑

1. **第一天**：只用 `/help`、`/model`、`@檔名`、`!指令`。先習慣跟它對話。
2. **第一週**：加上第 1 課的 10 個。重點是 `/compact`、`/resume`、`/rewind`，這三個讓你敢放手讓它做。
3. **第二週**：`/init` 幫常用專案寫 `CLAUDE.md`，`/permissions` 把常用指令設成不用再問。
4. **之後**：需要什麼情境就翻第 2 課的分組表，用 `/` 加幾個字母找指令。

---

## 參考資料

- 官方指令清單（含版本與方案限制）：<https://code.claude.com/docs/en/commands>
- 互動模式與快捷鍵：<https://code.claude.com/docs/en/interactive-mode>
- CLI 旗標：<https://code.claude.com/docs/en/cli-reference>
- 技能與自訂指令：<https://code.claude.com/docs/en/slash-commands>
