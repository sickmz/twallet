// Show the main menu to the user with custom keyboard options
function showMainMenu(chatId, message) {
  var language = translations[LANGUAGE];
  var customKeyboard = [
  [language['customkey_add_expense'], language['customkey_delete_expense']],
  [language['customkey_show_summary']]];

  var options = {reply_markup: JSON.stringify({keyboard: customKeyboard, one_time_keyboard: true, resize_keyboard: true,})}; 
  sendTelegramMessage(chatId, message, options);
}

// Show a welcome message to the user
function showWelcomeMessage(chatId) {
  var language = translations[LANGUAGE];
  var message = language['command_show_welcome'];
  sendTelegramMessage(chatId, message);
  var message = language['command_show_welcome_detailed'];
  
  showMainMenu(chatId, message);
}

// Show a help message to the user
function showHelpMessage(chatId) {
  var language = translations[LANGUAGE];
  var message = language['command_show_help'];

  showMainMenu(chatId, message);
}

// Get the current month 
function getMonth() {
  var date = new Date();
  const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre','Dicembre'];
  let month = months[date.getMonth()];
  
  return month;
}

// Check if the user is authenticated (authorized)
function checkUserAuthentication(id, message) {
  var language = translations[LANGUAGE];
  if (USER_ID == id)
    return true;

  sendTelegramMessage(id, language['error_not_authorized']);
  sendTelegramMessage(USER_ID, "@" + message.from.username + " (id: " + id + ") 🤔");

  return false;
}

// Get the Google Sheet by its ID and sheet name
function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
}
