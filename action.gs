// Start the expense adding process by showing categories
function startExpenseAddingProcess(chatId) {
  showCategories(chatId);
}

// Show categories to the user in an inline keyboard
function showCategories(chatId) {
  var language = translations[LANGUAGE];
  var inlineKeyboard = [];
  var row = [];
  var buttonsPerRow = 2;

  for (var category in categories) {
    if (row.length === buttonsPerRow) {
      inlineKeyboard.push(row);
      row = [];
      buttonsPerRow++;
    }
    row.push({ text: category, callback_data: 'category_' + category });
  }

  if (row.length > 0) {
    inlineKeyboard.push(row);
  }

  var options = {reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })};
  sendTelegramMessage(chatId, language['inline_choose_category'], options);
}

// Show sections based on the selected category
function showSections(chatId, category) {
  var language = translations[LANGUAGE];
  var sections = categories[category];
  
  var inlineKeyboard = [];
  var row = [];
  var buttonsPerRow = 2;

  for (var i = 0; i < sections.length; i++) {
    if (row.length === buttonsPerRow) {
      inlineKeyboard.push(row);
      row = [];
      buttonsPerRow++;
    }
    row.push({ text: sections[i], callback_data: 'section_' + sections[i] });
  }

  if (row.length > 0) {
    inlineKeyboard.push(row);
  }

  var options = {reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard })};
  sendTelegramMessage(chatId, language['inline_choose_section'], options);
}

// Funzione per generare un numero casuale tra min e max (inclusi)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Request price input from the user
function requestPriceInput(chatId) {
  var language = translations[LANGUAGE];

  var options = {reply_markup: JSON.stringify({force_reply: true})};
  sendTelegramMessage(chatId, language['inline_enter_price'], options);
}

// Save the user's expense in the Google Sheet
function saveExpense(chatId, price) {
  var month = getMonth();
  var category = PropertiesService.getScriptProperties().getProperty('category');
  var section = PropertiesService.getScriptProperties().getProperty('section');
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");

  var sheet = getSheet();
  sheet.appendRow([month, category, section, price, date]);

  var language = translations[LANGUAGE];
  var message = language['inline_expense_saved']
    .replace('{category}', category)
    .replace('{section}', section)
    .replace('{price}', price.toFixed(2));

  showMainMenu(chatId, message);

  PropertiesService.getScriptProperties().deleteProperty('category');
  PropertiesService.getScriptProperties().deleteProperty('section');  
}

// Get the last 5 expenses from the Google Sheet and start the expense deleting process
function getLastExpenses(chatId) {
  var language = translations[LANGUAGE];
  var sheet = getSheet();
  var numRows = sheet.getLastRow();
  var dataRange = sheet.getRange(numRows - 4, 2, 5, 4);
  var data = dataRange.getValues();

  var rowIndices = [];
  var expenses = [];
  var inlineKeyboard = [];

  for (var i = numRows - 4; i <= numRows; i++) {
    var expense = data[i - (numRows - 4)];
    expenses.push(expense);
    rowIndices.push(i);

    var date = Utilities.formatDate(expense[3], TIMEZONE, "dd/MM");
    var expenseText = "🗓️ " + date + ": " + expense[0] + "/" + expense[1] + " - " + expense[2] + " €";
    inlineKeyboard.push([{ text: expenseText, callback_data: 'delete_' + i }]);
  }

  var options = { reply_markup: JSON.stringify({ inline_keyboard: inlineKeyboard }) };
  sendTelegramMessage(chatId, language['inline_choose_expense'], options);

  return { data: expenses, rowIndices: rowIndices };
}

// Delete an expense from the Google Sheet
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
    var message = language['inline_expense_deleted']
    .replace('{category}', category)
    .replace('{section}', section)
    .replace('{price}', price);

    showMainMenu(chatId, message);

  } else { 
      sendTelegramMessage(chatId, language['error_unable_find_expense']); 
    }
}

// Calculate the total expenses from the Google Sheet data
function calculateTotalExpenses(data) {
  return data.slice(1).reduce((total, row) => {
    const expenseAmount = parseFloat(row[3]);
    return isNaN(expenseAmount) ? total : total + expenseAmount;
  }, 0);
}

// Calculate the summary of expenses by month and category
function calculateSummaryByMonthAndCategory(data) {
  var summaryByMonthAndCategory = {};
  var summaryByMonthTotal = {};

  for (var i = 1; i < data.length; i++) {
    var expenseCategory = data[i][1];
    var expenseAmount = parseFloat(data[i][3]);
    var expenseMonth = data[i][0];

    if (!isNaN(expenseAmount)) {
      if (!summaryByMonthAndCategory[expenseMonth]) {
        summaryByMonthAndCategory[expenseMonth] = {};
        summaryByMonthTotal[expenseMonth] = 0;
      }

      if (!summaryByMonthAndCategory[expenseMonth][expenseCategory]) {
        summaryByMonthAndCategory[expenseMonth][expenseCategory] = 0;
      }

      summaryByMonthAndCategory[expenseMonth][expenseCategory] += expenseAmount;
      summaryByMonthTotal[expenseMonth] += expenseAmount;
    }
  }

  return { summaryByMonthAndCategory, summaryByMonthTotal };
}

// Show the expense summary to the user
function showExpenseSummary(chatId) {
  try {
    var sheet = getSheet();
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();

    var language = translations[LANGUAGE];

    var { summaryByMonthAndCategory, summaryByMonthTotal } = calculateSummaryByMonthAndCategory(data);
    var globalExpenses = calculateTotalExpenses(data);

    var summaryText = "";

    for (var month in summaryByMonthTotal) {
      var totalAmountMonth = summaryByMonthTotal[month].toFixed(2);
      summaryText += "📅 " + month + ": *" + totalAmountMonth + " €*\n";

      for (var category in summaryByMonthAndCategory[month]) {
        var totalAmountCategory = summaryByMonthAndCategory[month][category].toFixed(2);
        summaryText += "   • " + category + ": " + totalAmountCategory + " €\n";
      }

      summaryText += "\n";
    }

    var globalExpenses= globalExpenses.toFixed(2);
    var summaryAnalisys = language['inline_global_expenses'].replace('{globalExpenses}', globalExpenses);  

    var options = { parse_mode: "Markdown"};
    
    sendTelegramMessage(chatId, summaryText, options);
    showMainMenu(chatId, summaryAnalisys);

  } catch (error) {
    sendTelegramMessage(chatId, language['error_showing_summary'].replace('{error.message}', error.message)); 
  }
}
