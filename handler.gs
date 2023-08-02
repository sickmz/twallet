// ---------------------------------------------------------------------------------------------------
// Script initialization
// ---------------------------------------------------------------------------------------------------

var TELEGRAM_TOKEN = ''; 
var SHEET_ID = ''; 
var SHEET_NAME = ''; 
var WEBAPP_URL = ''; 
var USER_ID = ""; 
var TIMEZONE = "Europe/Rome";
var categories = { 
  'house': ['gas', 'water', 'tax'],
  'food': ['groceries', 'delivery'],
  'finance': ['brokers', 'banks', 'exchanges']
};

// ---------------------------------------------------------------------------------------------------
// Handle POST request
// ---------------------------------------------------------------------------------------------------

function doPost(e) {
  try {
    var update = JSON.parse(e.postData.contents);

    if (update.callback_query) {
      handleCallback(update.callback_query);
    } else if (update.message && checkUserAuthentication(update.message.chat.id)) {
      handleMessage(update.message);
    }
  } catch (error) {
    Logger.log('❌ Error handling POST request: ' + error.message + ' ❌');
  }
}

function handleCallback(callbackQuery) {
  var callbackQueryData = callbackQuery.data.split('_');
  var chatId = callbackQuery.message.chat.id;
  var action = callbackQueryData[0];

  switch (action) {

    case 'delete':
      var expenseIndex = parseInt(callbackQueryData[1], 10);
      deleteExpense(chatId, expenseIndex);
      break;

    case 'category':
      var category = callbackQueryData[1];
      PropertiesService.getScriptProperties().setProperty('category', category);
      showSections(chatId, category);
      break;

    case 'section':
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
  var text = message.text;

  switch (text) {
    case '/cancel':
      showMainMenu(chatId);
      break;

    case '🍕 Add expense':
      startExpenseAddingProcess(chatId);
      break;

    case '🥊 Delete expense':
      startExpenseDeletingProcess(chatId);
      break;

    case '💸 Summary':
      showExpenseSummary(chatId);
      break;

    default:
      if (message.reply_to_message && message.reply_to_message.text === 'Enter the price:') {
        var price = parseFloat(message.text.replace(/[, ]/g, '.'));
        if (!isNaN(price)) {
          saveExpense(chatId, price);
          break;
        } else {
            sendTelegramMessage(chatId, "❌ Error: the value entered (" + message.text + ") is not a number! ❌");  
            showMainMenu(chatId);
            break;
        }  
      } else { 
          sendTelegramMessage(chatId, "❌ Error: command (" + message.text + ") not recognized! ❌");
          showMainMenu(chatId);
          break;
        }
  }
}

// ---------------------------------------------------------------------------------------------------
// Add expense
// ---------------------------------------------------------------------------------------------------

function startExpenseAddingProcess(chatId) {
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
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");

  var sheet = getSheet();
  sheet.appendRow([month, category, section, price, date]);

  var message = "Expense saved! ✔️\n\n";
  message += "Category: " + category + "\n";
  message += "Section: " + section + "\n";
  message += "Price: " + price + " €";

  sendTelegramMessage(chatId, message);
  PropertiesService.getScriptProperties().deleteAllProperties();
  
  showMainMenu(chatId);
}

function showMainMenu(chatId) {
  var customKeyboard = [
  ['🍕 Add expense', '🥊 Delete expense'],
  ['💸 Summary']
];
  var options = {
    reply_markup: JSON.stringify({
      keyboard: customKeyboard,
      one_time_keyboard: true,
      resize_keyboard: true
    })
  };

  sendTelegramMessage(chatId, 'Choose an option:', options);
}

// ---------------------------------------------------------------------------------------------------
// Delete expense
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
    var date = Utilities.formatDate(expense[3], TIMEZONE, "dd/MM")
    var expenseText = "🗓️ " + date + ": " + expense[0] + "/" + expense[1] + " - " + expense[2] + " €";
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
    var deletedExpense = expensesData.data[rowIndices.indexOf(expenseIndex)];
    var category = deletedExpense[0];
    var section = deletedExpense[1];
    var price = parseFloat(deletedExpense[2]).toFixed(2);

    sheet.deleteRow(expenseIndex);

    var message = "Expense deleted! ✔️\n\n";
    message += "Category: " + category + "\n";
    message += "Section: " + section + "\n";
    message += "Price: " + price + " €";

    sendTelegramMessage(chatId, message);
    showMainMenu(chatId);
  } else {
    sendTelegramMessage(chatId, '❌ Error: Unable to find the selected expense ❌');
  }
}

// ---------------------------------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------------------------------

function showExpenseSummary(chatId) {
  try {
    var sheet = getSheet();
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();

    var summaryByCategory = {};
    var summaryByMonth = {};

    for (var category in categories) {
      summaryByCategory[category] = 0;
    }

    for (var i = 1; i < data.length; i++) {
      var expenseCategory = data[i][1];
      var expenseAmount = parseFloat(data[i][3]);
      var expenseMonth = data[i][0];

      if (!isNaN(expenseAmount)) {
        summaryByCategory[expenseCategory] += expenseAmount;

        if (!summaryByMonth[expenseMonth]) {
          summaryByMonth[expenseMonth] = 0;
        }
        summaryByMonth[expenseMonth] += expenseAmount;
      }
    }

    var summaryText = "Expenses summary:\n\nBy category:\n";
    var totalAmountByCategory = 0;

    for (var category in summaryByCategory) {
      var totalAmountCategory = summaryByCategory[category].toFixed(2);
      summaryText += category + ": " + totalAmountCategory + " €\n";
      totalAmountByCategory += summaryByCategory[category];
    }

    summaryText += "\nTotal: " + totalAmountByCategory.toFixed(2) + " €\n\nBy month:\n";
    var totalAmountByMonth = 0;

    for (var month in summaryByMonth) {
      var totalAmountMonth = summaryByMonth[month].toFixed(2);
      summaryText += month + ": " + totalAmountMonth + " €\n";
      totalAmountByMonth += summaryByMonth[month];
    }

    summaryText += "\nTotal: " + totalAmountByMonth.toFixed(2) + " €\n";

    sendTelegramMessage(chatId, summaryText);
    showMainMenu(chatId);
  } catch (error) {
    Logger.log('Error showing expense summary: ' + error.message);
  }
}

// ---------------------------------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------------------------------
// Telegram API
// ---------------------------------------------------------------------------------------------------

function setWebhook() {
  try {
    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${WEBAPP_URL}`;
    var response = UrlFetchApp.fetch(url);
  } catch (error) {
    Logger.log('Error setting up webhook: ' + error.message);
  }
}

function sendTelegramMessage(chatId, text, options) {
  try {
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
  } catch (error) {
    Logger.log('Error sending Telegram message: ' + error.message);
  }
}
