// ---------------------------------------------------------------------------------------------------
// Script initialization
// ---------------------------------------------------------------------------------------------------

var TELEGRAM_TOKEN = ''; 
var SHEET_ID = ''; 
var SHEET_NAME = ''; 
var WEBAPP_URL = ''; 
var userId = ""; 
var categories = { 
  'house': ['gas', 'water', 'tax'],
  'food': ['groceries', 'delivery'],
  'finance': ['brokers', 'banks', 'exchanges']
};

// ---------------------------------------------------------------------------------------------------
// Callback
// ---------------------------------------------------------------------------------------------------
var CallbackMenu = {
  ADD: 'add',
  DELETE: 'delete',
};

var CallbackTypes = {
  ACTION: 'action',
  DELETE: 'delete',
  CATEGORY: 'category',
  SECTION: 'section',
};

// ---------------------------------------------------------------------------------------------------
// Telegram API
// ---------------------------------------------------------------------------------------------------
function setWebhook() {
  var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${WEBAPP_URL}`;
  var response = UrlFetchApp.fetch(url);
}

function sendTelegramMessage(chatId, text, options) {
  options = options || {};
  options.chat_id = chatId;
  options.text = text;

  var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
  var payload = JSON.stringify(options);
  var params = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };

  UrlFetchApp.fetch(url, params);
}

// ---------------------------------------------------------------------------------------------------
// Manage POST request
// ---------------------------------------------------------------------------------------------------
function doPost(e) {
  var update = JSON.parse(e.postData.contents);

  if (update.callback_query) {
    handleCallback(update.callback_query);
  } else if (update.message && checkUserAuthentication(update.message.chat.id)) {
    handleMessage(update.message);
  }
}

function handleCallback(callbackQuery) {
  var callbackQueryData = callbackQuery.data.split('_');
  var chatId = callbackQuery.message.chat.id;
  var action = callbackQueryData[0];
  var actionType = callbackQueryData[1];

  switch (action) {
    case CallbackTypes.ACTION:
      if (actionType === CallbackMenu.ADD) {
        startExpenseAddingProcess(chatId);
      } else if (actionType === CallbackMenu.DELETE) {
        startExpenseDeletingProcess(chatId);
      }
      break;

    case CallbackTypes.DELETE:
      var expenseIndex = parseInt(callbackQueryData[1], 10);
      deleteExpense(chatId, expenseIndex);
      break;

    case CallbackTypes.CATEGORY:
      var category = callbackQueryData[1];
      PropertiesService.getScriptProperties().setProperty('category', category);
      showSections(chatId, category);
      break;

    case CallbackTypes.SECTION:
      var section = callbackQueryData[1];
      PropertiesService.getScriptProperties().setProperty('section', section);
      requestPriceInput(chatId);
      break;

    default:
      sendTelegramMessage(chatId, '❌ Unknown callback type ❌');
      break;
  }
}

function handleMessage(message) {
  var chatId = message.chat.id;

  if (message.reply_to_message && message.reply_to_message.text === 'Enter the price:') {
    var price = parseFloat(message.text.replace(",", ".").replace(/\s/g, ''));

    if (!isNaN(price && !message.text.includes("."))) {
      saveExpense(chatId, price);
    } else {
      sendTelegramMessage(chatId, "❌ Error: the value entered (" + message.text + ") is not a number! ❌");
    }
  } else {
    showMainMenu(chatId);
  }
}

// ---------------------------------------------------------------------------------------------------
// delete expense: lastEpenses + startDeleting + delete
// ---------------------------------------------------------------------------------------------------

function getLastExpenses() {
  var sheet = getSheet();
  var numRows = sheet.getLastRow();
  var dataRange = sheet.getRange(numRows - 4, 2, 5, 4); 
  var data = dataRange.getValues();

  var rowIndices = [];
  var expenses = [];
  for (var i = numRows - 4; i <= numRows; i++) {
    var expense = data[i - (numRows - 4)];
    expenses.push(expense);
    rowIndices.push(i);
  }

  return { data: expenses, rowIndices: rowIndices };
}

function startExpenseDeletingProcess(chatId) {
  var expensesData = getLastExpenses();
  var inlineKeyboard = expensesData.data.map(function (expense, index) {
    var longDate = expense[3];
    var date = new Date(longDate);
    var shortDate = Utilities.formatDate(date, "GMT", "dd/MM");
    var expenseText = "🗓️ " + shortDate + ": " + expense[0] + "/" + expense[1] + " - " + expense[2] + " €";
    return [{ text: expenseText, callback_data: 'delete_' + expensesData.rowIndices[index] }];
  });

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, 'Choose the expense to be eliminated:', options);
}

function deleteExpense(chatId, expenseIndex) {
  var expensesData = getLastExpenses();
  var rowIndices = expensesData.rowIndices;

  if (rowIndices.includes(expenseIndex)) {
    var sheet = getSheet();
    sheet.deleteRow(expenseIndex);

    sendTelegramMessage(chatId, 'Expense successfully eliminated! ✔️');
  } else {
    sendTelegramMessage(chatId, '❌ Error: Unable to find the selected expense ❌');
  }
}


// ---------------------------------------------------------------------------------------------------
// add expense: lastEpenses + startDeleting + delete
// ---------------------------------------------------------------------------------------------------


function startExpenseAddingProcess(chatId) {
  PropertiesService.getScriptProperties().setProperty('action', CallbackMenu.ADD);
  showCategories(chatId);
}


function showCategories(chatId) {
  var inlineKeyboard = Object.keys(categories).map(function (category) {
    return [{ text: category, callback_data: 'category_' + category }];
  });

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, 'Choose a category:', options);
}

function showSections(chatId, category) {
  var sections = categories[category];
  var inlineKeyboard = sections.map(function (section) {
    return [{ text: section, callback_data: 'section_' + section }];
  });

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, 'Choose a section:', options);
}

function requestPriceInput(chatId) {
  var options = {
    reply_markup: JSON.stringify({
      force_reply: true
    })
  };

  sendTelegramMessage(chatId, 'Enter the price:', options);
}

function saveExpense(chatId, price) {
  var month = getMonth();
  var category = PropertiesService.getScriptProperties().getProperty('category');
  var section = PropertiesService.getScriptProperties().getProperty('section');
  var fullDate = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");

  var sheet = getSheet();
  sheet.appendRow([month, category, section, price, fullDate]);

  sendTelegramMessage(chatId, 'Expense saved ✔️');
  PropertiesService.getScriptProperties().deleteAllProperties();
}

function showMainMenu(chatId) {
  var inlineKeyboard = [
    [{ text: 'Add expenses', callback_data: 'action_add' }],
    [{ text: 'Delete expenses', callback_data: 'action_delete' }],
  ];

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, 'Choose an option:', options);
}

// ---------------------------------------------------------------------------------------------------
// Utilities + Authentication
// ---------------------------------------------------------------------------------------------------

function getMonth() {
  var date = new Date();
  const months = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];
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
