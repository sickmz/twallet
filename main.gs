function doPost(e) {
  try {
    var language = translations[LANGUAGE];
    var update = JSON.parse(e.postData.contents);

    if (update.callback_query) {
      handleCallback(update.callback_query);
    } else if (update.message && checkUserAuthentication(update.message.chat.id, update.message)) {
      handleMessage(update.message);
    }
  } catch (error) {
    sendTelegramMessage(update.message.chat.id, language['error_post_request']
    .replace('{error.message}', error.message));
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
      sendTelegramMessage(chatId, language['error_unknown_callback']);
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
      showMainMenu(chatId, language['command_canceled']);
      break;

    case '/help':
      showHelpMessage(chatId);
      break;

    case '/language':
      showLanguageOptions(chatId);
      break;

    case '🍕 ' + language['customkey_add_expense']:
      startExpenseAddingProcess(chatId);
      break;

    case '🥊 ' + language['customkey_delete_expense']:
      startExpenseDeletingProcess(chatId);
      break;

    case '💸 ' + language['customkey_show_summary']:
      showExpenseSummary(chatId);
      break;

    default:
      if (message.reply_to_message && message.reply_to_message.text === language['inline_enter_price']) {
        if (/^[0-9.,]+$/.test(message.text)) {
        var price = parseFloat(message.text.replace(',', '.'));
        saveExpense(chatId, price);
        break;
      } else {
          var error = language['error_invalid_characters']
          .replace('{message.text}', message.text);  
          showMainMenu(chatId, error);
          break;
        }
      }  else { 
          var error = language['error_command_not_recognized']
          .replace('{message.text}', message.text);  
          showMainMenu(chatId, error);
          break;
        }
    }
}
