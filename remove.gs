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
