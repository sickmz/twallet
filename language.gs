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
    'global_expenses': 'Spese totali:',
    'most_frequent_category': 'Categoria più frequente:',
    'most_frequent_section': 'Sezione più frequente:',
    'occurrences': 'occorrenze',
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
    'global_expenses': 'Global expenses:',
    'most_frequent_category': 'Most frequent category:',
    'most_frequent_section': 'Most frequent section:',
    'occurrences': 'occurrences',

  }
};

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
