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

var LANGUAGE = PropertiesService.getScriptProperties().getProperty('LANGUAGE') || 'english';
var translations = {
  'italian': {
    'choose_option': 'Scegli un\'opzione:',
    'choose_category': 'Scegli una categoria:',
    'choose_section': 'Scegli una sezione:',
    'enter_price': 'Inserisci il prezzo:',
    'expense_saved': 'Spesa salvata! ✔️\n\nCategoria: {category}\nSezione: {section}\nPrezzo: {price} €',
    'expense_deleted': 'Spesa eliminata! ✔️\n\nCategoria: {category}\nSezione: {section}\nPrezzo: {price} €',
    'add_expense': 'Aggiungi spesa',
    'delete_expense': 'Elimina spesa',
    'show_summary': 'Riassunto',
    'enter_price': 'Inserisci il prezzo:',
    'canceled': '👍 Interrotto',
  },
  'english': {
    'choose_option': 'Choose an option:',
    'choose_category': 'Choose a category:',
    'choose_section': 'Choose a section:',
    'enter_price': 'Enter the price:',
    'expense_saved': 'Expense saved! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'expense_deleted': 'Expense deleted! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'add_expense': 'Add expense',
    'delete_expense': 'Delete expense',
    'show_summary': 'Summary',
    'enter_price': 'Enter the price:',
    'canceled': '👍 Canceled',

  }
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
    
    case 'language':
      var language = callbackQueryData[1];
      setLanguage(chatId, language);
      break;

    default:
      sendTelegramMessage(chatId, '❌ Unknown callback type ❌');
      break;
  }
}

function handleMessage(message) {
  var language = translations[LANGUAGE];
  var chatId = message.chat.id;
  var text = message.text;

  switch (text) {
    
    case '/start':
      showWelcomeMessage(chatId);
      break;

    case '/cancel':
      showMainMenu(chatId, language['canceled']);
      break;

    case '/help':
      showHelpMessage(chatId);
      break;

    case '/language':
      showLanguageOptions(chatId);
      break;

    case '🍕 ' + language['add_expense']:
      startExpenseAddingProcess(chatId);
      break;

    case '🥊 ' + language['delete_expense']:
      startExpenseDeletingProcess(chatId);
      break;

    case '💸 ' + language['show_summary']:
      showExpenseSummary(chatId);
      break;

    default:
      if (message.reply_to_message && message.reply_to_message.text === language['enter_price']) {
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
  var language = translations[LANGUAGE];
  var inlineKeyboard = Object.keys(categories).map(function (category) {
    return [{ text: category, callback_data: 'category_' + category }];
  });

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, language['choose_category'], options);
}

function showSections(chatId, category) {
  var language = translations[LANGUAGE];
  var sections = categories[category];
  var inlineKeyboard = sections.map(function (section) {
    return [{ text: section, callback_data: 'section_' + section }];
  });

  var options = {
    reply_markup: JSON.stringify({
       inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, language['choose_section'], options);
}

function requestPriceInput(chatId) {
  var language = translations[LANGUAGE];
  var options = {
    reply_markup: JSON.stringify({
      force_reply: true
    })
  };

  sendTelegramMessage(chatId, language['enter_price'], options);
}

function saveExpense(chatId, price) {
  var month = getMonth();
  var category = PropertiesService.getScriptProperties().getProperty('category');
  var section = PropertiesService.getScriptProperties().getProperty('section');
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");

  var sheet = getSheet();
  sheet.appendRow([month, category, section, price, date]);

  var language = translations[LANGUAGE];
  var message = language['expense_saved']
    .replace('{category}', category)
    .replace('{section}', section)
    .replace('{price}', price.toFixed(2));

  showMainMenu(chatId, message);

  PropertiesService.getScriptProperties().deleteProperty('category');
  PropertiesService.getScriptProperties().deleteProperty('section');
  
}

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

    var language = translations[LANGUAGE];
    var message = language['expense_deleted']
    .replace('{category}', category)
    .replace('{section}', section)
    .replace('{price}', price);

    showMainMenu(chatId, message);

  } else { sendTelegramMessage(chatId, '❌ Error: Unable to find the selected expense ❌'); }
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

    var summaryText = "*By category*\n\n";
    var totalAmountByCategory = 0;

    for (var category in summaryByCategory) {
      var totalAmountCategory = summaryByCategory[category].toFixed(2);
      summaryText += category + ": " + totalAmountCategory + " €\n";
      totalAmountByCategory += summaryByCategory[category];
    }

    summaryText += "\n<b>Total</b>: " + totalAmountByCategory.toFixed(2) + " €\n\nBy month\n\n";
    var totalAmountByMonth = 0;

    for (var month in summaryByMonth) {
      var totalAmountMonth = summaryByMonth[month].toFixed(2);
      summaryText += month + ": " + totalAmountMonth + " €\n";
      totalAmountByMonth += summaryByMonth[month];
    }

    summaryText += "\nTotal: " + totalAmountByMonth.toFixed(2) + " €\n";
    
    showMainMenu(chatId, summaryText);
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

// ---------------------------------------------------------------------------------------------------
// Language
// ---------------------------------------------------------------------------------------------------

function showLanguageOptions(chatId) {
  var inlineKeyboard = [
    [{ text: (LANGUAGE === 'italian' ? '✅🇮🇹 Italian' : '🇮🇹 Italian'), callback_data: 'language_italian' }],
    [{ text: (LANGUAGE === 'english' ? '✅🇬🇧 English' : '🇬🇧 English'), callback_data: 'language_english' }]
  ];

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, '🌍 Use the buttons down here to change the bot\'s language:', options);
}

function setLanguage(chatId, language) {
  LANGUAGE = language;
  PropertiesService.getScriptProperties().setProperty('LANGUAGE', language); 
  var message = 'Language set to: ' + language + '';
  showMainMenu(chatId, message);
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
