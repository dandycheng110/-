// ============================================================
// LLS 問卷 - Google Apps Script
// 使用方式：
//   1. 開啟 Google Sheets，點選「擴充功能」→「Apps Script」
//   2. 將此檔案全部內容貼入編輯器
//   3. 點選「部署」→「新增部署作業」→「網頁應用程式」
//      - 執行身分：我（你的帳號）
//      - 誰可以存取：所有人
//   4. 複製產生的網址，貼回 LLS.html 的 APPS_SCRIPT_URL 變數
// ============================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    // 若 Sheet 是空的，自動建立標題列
    if (sheet.getLastRow() === 0) {
      const header = ['時間戳記', '姓名', '學號', '班級'];
      for (let i = 1; i <= 49; i++) header.push('Q' + i);
      header.push(
        '記憶策略avg', '認知策略avg', '補償策略avg',
        '後設認知策略avg', '情意策略avg', '社會策略avg',
        '總平均', '開放題回答'
      );
      sheet.appendRow(header);
    }

    // 建立資料列
    const row = [
      new Date(),
      data.name  || '',
      data.id    || '',
      data.class || '',
    ];
    for (let i = 1; i <= 49; i++) {
      row.push(data.answers['q' + i] ?? '');
    }
    row.push(
      data.scores['記憶策略'],
      data.scores['認知策略'],
      data.scores['補償策略'],
      data.scores['後設認知策略'],
      data.scores['情意策略'],
      data.scores['社會策略'],
      data.totalAvg,
      data.openQ || ''
    );

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 測試用（可在 Apps Script 編輯器直接執行）
function testSetup() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  Logger.log('試算表名稱：' + sheet.getName());
  Logger.log('目前列數：'  + sheet.getLastRow());
}
