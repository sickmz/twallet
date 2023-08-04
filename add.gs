
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
