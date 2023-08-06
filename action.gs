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

  sendTelegramMessage(chatId, language['inline_choose_category'], options);
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

  sendTelegramMessage(chatId, language['inline_choose_section'], options);
}

function requestPriceInput(chatId) {
  var language = translations[LANGUAGE];
  var options = {
    reply_markup: JSON.stringify({
      force_reply: true
    })
  };

  sendTelegramMessage(chatId, language['inline_enter_price'], options);
}

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
  var language = translations[LANGUAGE];
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

  sendTelegramMessage(chatId, language['inline_choose_expense'], options);
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
    var message = language['inline_expense_deleted']
    .replace('{category}', category)
    .replace('{section}', section)
    .replace('{price}', price);

    showMainMenu(chatId, message);

  } else { sendTelegramMessage(chatId, language['error_unable_find_expense']); }
}

function calculateTotalExpenses(data) {
  var totalExpenses = 0;

  for (var i = 1; i < data.length; i++) {
    var expenseAmount = parseFloat(data[i][3]);

    if (!isNaN(expenseAmount)) {
      totalExpenses += expenseAmount;
    }
  }

  return totalExpenses;
}

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

function findMostFrequentCategoryAndSection(data) {
  var categoryCounts = {};
  var sectionCounts = {};
  var mostFrequentCategory = { name: '', count: 0 };
  var mostFrequentSection = { name: '', count: 0 };

  for (var i = 1; i < data.length; i++) {
    var expenseCategory = data[i][1];
    var expenseSection = data[i][2];

    // Count occurrences of each category
    categoryCounts[expenseCategory] = (categoryCounts[expenseCategory] || 0) + 1;
    // Count occurrences of each section
    sectionCounts[expenseSection] = (sectionCounts[expenseSection] || 0) + 1;

    // Update the most frequent category
    if (categoryCounts[expenseCategory] > mostFrequentCategory.count) {
      mostFrequentCategory.name = expenseCategory;
      mostFrequentCategory.count = categoryCounts[expenseCategory];
    }

    // Update the most frequent section
    if (sectionCounts[expenseSection] > mostFrequentSection.count) {
      mostFrequentSection.name = expenseSection;
      mostFrequentSection.count = sectionCounts[expenseSection];
    }
  }

  return { mostFrequentCategory, mostFrequentSection };
}

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
    var { mostFrequentCategory, mostFrequentSection } = findMostFrequentCategoryAndSection(data);

    var summaryAnalisys = "😱 " + language['inline_global_expenses'] + " " + globalExpenses + " €\n";  
    summaryAnalisys += "🤜 " + language['inline_most_frequent_category'] + " " + mostFrequentCategory.name + " (" + language['inline_occurrences'] + ": " + mostFrequentCategory.count + ")\n";
    summaryAnalisys += "🤜 " + language['inline_most_frequent_section']  + " " + mostFrequentSection.name + " (" + language['inline_occurrences'] + ": " + mostFrequentSection.count + ")\n";

    var options = {
      parse_mode: "Markdown"
    };

    sendTelegramMessage(chatId, summaryText, options);
    showMainMenu(chatId, summaryAnalisys);

  } catch (error) {
    sendTelegramMessage(chatId, language['error_showing_summary'].replace('{error.message}', error.message)); 
  }
}
