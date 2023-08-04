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
