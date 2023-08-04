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

    var summaryText = "Expenses summary:\n\n";

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

    var summaryAnalisys = "😱 " + language['global_expenses'] + " " + globalExpenses + " €\n";  
    summaryAnalisys += "🤜 " + language['most_frequent_category'] + " " + mostFrequentCategory.name + " (" + language['occurrences'] + ": " + mostFrequentCategory.count + ")\n";
    summaryAnalisys += "🤜 " + language['most_frequent_section']  + " " + mostFrequentSection.name + " (" + language['occurrences'] + ": " + mostFrequentSection.count + ")\n";

    var options = {
      parse_mode: "Markdown"
    };

    sendTelegramMessage(chatId, summaryText, options);
    showMainMenu(chatId, summaryAnalisys);

  } catch (error) {
    sendTelegramMessage(chatId, '❌ Error showing expense summary: ' + error.message + ' ❌');
  }
}
