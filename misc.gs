function showMainMenu(chatId, message) {
  var language = translations[LANGUAGE];
  var customKeyboard = [
  ['🍕 ' + language['customkey_add_expense'], '🥊 ' + language['customkey_delete_expense']],
  ['💸 ' + language['customkey_show_summary']]];

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
  var language = translations[LANGUAGE];
  var message = language['command_show_welcome'];
  sendTelegramMessage(chatId, message);
  var message = language['command_show_welcome_detailed'];
  
  showMainMenu(chatId, message);
}

function showHelpMessage(chatId) {
  var language = translations[LANGUAGE];
  var message = language['command_show_help'];

  showMainMenu(chatId, message);
}

function getMonth() {
  var date = new Date();
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
  let month = months[date.getMonth()];
  
  return month;
}

function checkUserAuthentication(id, message) {
  var language = translations[LANGUAGE];
  if (USER_ID == id)
    return true;

  sendTelegramMessage(id, "⛔" + language['error_not_authorized'] + "⛔");
  sendTelegramMessage(USER_ID, "@" + message.from.username + " (id: " + id + ") 🤔");

  return false;
}

function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}
