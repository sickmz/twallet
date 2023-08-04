function showMainMenu(chatId, message) {
  var language = translations[LANGUAGE];
  var customKeyboard = [
  ['🍕 ' + language['add_expense'], '🥊 ' + language['delete_expense']],
  ['💸 ' + language['show_summary']]];

  var options = {
  reply_markup: JSON.stringify({
    keyboard: customKeyboard,
    one_time_keyboard: true,
    resize_keyboard: true,
    })
  };
  
  sendTelegramMessage(chatId, message, options);
}

function showWelcomeMessage(chatId) {
  var message = '👋 Hi, my name is twallet and I can help you keeping track of your expenses!';
  sendTelegramMessage(chatId, message);
  var message = '✅ What you need to know\n\n';
  message += '1️⃣ Only you can interact with your bot, thanks to telegram ID-based authentication\n\n';
  message += '2️⃣ You can add everyday expenses through categories and sections with convenient inline keyboardsn\n\n';
  message += '3️⃣ You can fully customize categories and sections\n\n';
  message += '4️⃣ You can delete one of the last 5 expenses entered\n\n';
  message += '5️⃣ You can check how much you\'ve spent since the beginning of the year, both by month and by category';
  
  showMainMenu(chatId, message);
}

function showHelpMessage(chatId) {
  var message = '⚙️ Commands\n\n';
  message += '• /start: show the welcome message \n';
  message += '• /help: open this message and get help \n';
  message += '• /cancel: cancel the current command \n';
  message += '• /language: change the bot\'s language \n\n';
  message += '👤 Contact me\n\n';
  message += '• @sickmz';

  showMainMenu(chatId, message);
}

function getMonth() {
  var date = new Date();
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  let month = months[date.getMonth()];
  
  return month;
}

function checkUserAuthentication(id) {
  if (USER_ID == id)
    return true;

  sendTelegramMessage(id, "⛔ You're not authorized! ⛔");
  return false;
}

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}

