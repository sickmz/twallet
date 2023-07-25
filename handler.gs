// ---------------------------------------------------------------------------------------------------
// Script initialization
// ---------------------------------------------------------------------------------------------------
var TELEGRAM_TOKEN = ''; // Fill with your own Telegram Bot Token ID
var SHEET_ID = ''; // Fill with Google Spreadsheet ID  
var WEBAPP_URL = ''; // Fill with your google webapp address
var userId = ""; // Fill with your telegram user ID
var categories = { // Fill with your own categories and section
  'house': ['gas', 'water', 'tax'],
  'food': ['groceries', 'delivery'],
  'finance': ['brokers', 'banks', 'exchanges']
};

 // PSA: set the name of the sheet where you intend to save the data in row 70
 // ---------------------------------------------------------------------------------------------------
 // Script initialization finish
 // ---------------------------------------------------------------------------------------------------


function setWebhook() {
  var url = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/setWebhook?url=' + WEBAPP_URL;
  var response = UrlFetchApp.fetch(url);
}

function doPost(e) {
  var update = JSON.parse(e.postData.contents);
  
  if (update.callback_query) {
    var callbackQueryData = update.callback_query.data.split('_');
    var chatId = update.callback_query.message.chat.id;
    
    if (callbackQueryData[0] === 'category') {
      var category = callbackQueryData[1];
      PropertiesService.getScriptProperties().setProperty('category', category);
      var sections = categories[category];
      var inlineKeyboard = sections.map(function(section) {
        return [{ text: section, callback_data: 'section_' + section }];
      });
      
      var options = {
        reply_markup: JSON.stringify({
          inline_keyboard: inlineKeyboard
        })
      };
      
      sendTelegramMessage(chatId, 'Choose a section:', options);
    } else if (callbackQueryData[0] === 'section') {
      var section = callbackQueryData[1];
      PropertiesService.getScriptProperties().setProperty('section', section);
      var options = {
        reply_markup: JSON.stringify({
          force_reply: true
        })
      };
      
      sendTelegramMessage(chatId, 'Enter the price:', options);
    }
  } else if (update.message && checkUserAutentication(update.message.chat.id)) {
    var message = update.message;
    var chatId = message.chat.id;
    
    if (message.reply_to_message && message.reply_to_message.text === 'Enter the price:') {
      if(!isNaN(message.text.replace(",", "."))) {
      var month = getMonth();
      var category = PropertiesService.getScriptProperties().getProperty('category');
      var section = PropertiesService.getScriptProperties().getProperty('section');
      var price = message.text.replace(".",",");
      var fullDate = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");

      var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('CHANGE-SHEET-NAME'); // name of the sheet where you want to save the data
      sheet.appendRow([month, category, section, price, fullDate]);
      
      sendTelegramMessage(chatId, 'Expense added successfully! ✔️');
      PropertiesService.getScriptProperties().deleteAllProperties();
      } else {
          sendTelegramMessage(chatId, "❌ An error occurred: value inserted (" + message.text +") is not a number! ❌")
          }

    } else {
      var inlineKeyboard = Object.keys(categories).map(function(category) {
        return [{ text: category, callback_data: 'category_' + category }];
      });
      
      var options = {
        reply_markup: JSON.stringify({
          inline_keyboard: inlineKeyboard
        })
      };
      
      sendTelegramMessage(chatId, 'Choose a category:', options);
    }
  }
}

function getMonth()
{
  var date = new Date();
  const months = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
  let month = months[date.getMonth()];

  return month;
}

function checkUserAutentication(id)
{
    if (userId == id)
      return true;
  
  sendTelegramMessage(id, "⛔ You're not authorized! ⛔");
  return false;
}

function sendTelegramMessage(chatId, text, options) {
  options = options || {};
  options.chat_id = chatId;
  options.text = text;
  
  var url = 'https://api.telegram.org/bot' + TELEGRAM_TOKEN + '/sendMessage';
  var payload = JSON.stringify(options);
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };
  
  UrlFetchApp.fetch(url, params);
}
