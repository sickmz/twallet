var LANGUAGE = PropertiesService.getScriptProperties().getProperty('LANGUAGE') || 'english';
var translations = {
  'italian': {

    /* Inline keyboard actions */
    'inline_choose_category': 'Scegli una categoria:',
    'inline_choose_section': 'Scegli una sezione:',
    'inline_enter_price': 'Inserisci il prezzo:',
    'inline_expense_saved': 'Spesa salvata! ✔️\n\nCategoria: {category}\n Sezione: {section}\n Prezzo: {price} €',
    'inline_choose_expense':'Scegli una spesa da eliminare:',
    'inline_expense_deleted': 'Spesa eliminata! ✔️\n\nCategoria: {category}\n Sezione: {section}\n Prezzo: {price} €',
    'inline_global_expenses': 'Spese totali:',
    'inline_most_frequent_category': 'Categoria più frequente:',
    'inline_most_frequent_section': 'Sezione più frequente:',
    'inline_occurrences': 'occorrenze',

    /* Custom keyboard */
    'customkey_add_expense': 'Aggiungi spesa',
    'customkey_delete_expense': 'Elimina spesa',
    'customkey_show_summary': 'Riassunto',

    /* Misc */
    'error_not_authorized':'Non sei autorizzato',
    'error_invalid_characters':'❌ Errore: il valore inserito ({message.text}) contiene caratteri non validi! ❌',
    'error_command_not_recognized':'❌ Errore: comando ({message.text}) non riconosciuto! ❌',
    'error_post_request':'❌ Errore nel gestire la richiesta: {error.message} ❌',
    'error_unknown_callback':'❌ Callback sconosciuta ❌',
    'error_unable_find_expense':'❌ Errore: impossibile trovare la spesa selezionata ❌',
    'error_showing_summary':'❌ Errore durante la visualizzazione del riepilogo spese: {error.message} ❌',

    /* Bot commands*/  
    'command_language': '🌍 Usa i pulsanti qui sotto per cambiare la lingua del bot:',
    'command_canceled': '👍 Annullato. Se hai problemi, consulta la pagina /help',
    'command_show_help':' ⚙️ Comandi\n\n • /start: mostra benvenuto \n • /help: ottieni aiuto \n • /cancel: cancella l\'operazione in corso \n • /language: cambia la lingua del bot \n\n 👤 Contatti \n\n • @sickmz',
    'command_show_welcome':'👋 Ciao, sono Twallet e posso aiutarti a tracciare le spese!',
    'command_show_welcome_detailed':'✅ Cosa devi sapere \n\n 1️⃣ Solo tu puoi interagire con il tuo bot, grazie all\'autenticazione basata sull\'ID Telegram \n\n 2️⃣ Puoi aggiungere le spese quotidiane attraverso categorie e sezioni con comode tastiere inline \n\n 3️⃣ Puoi personalizzare completamente categorie e sezioni\n\n 4️⃣ Puoi eliminare una delle cinque ultime spese inserite\n\n 5️⃣ Puoi controllare quanto hai speso dall\'inizio dell\'anno, sia per mese che per categoria \n\n Ricorda: se hai bisogno di aiuto digita /help!',

  },
  'english': {

    /* Inline keyboard actions */
    'inline_choose_category': 'Choose a category:',
    'inline_choose_section': 'Choose a section:',
    'inline_enter_price': 'Enter the price:',
    'inline_expense_saved': 'Expense saved! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'inline_choose_expense':'Choose the expense to be eliminated:',
    'inline_expense_deleted': 'Expense deleted! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'inline_global_expenses': 'Global expenses:',
    'inline_most_frequent_category': 'Most frequent category:',
    'inline_most_frequent_section': 'Most frequent section:',
    'inline_occurrences': 'occurrences',

    /* Custom keyboard */
    'customkey_add_expense': 'Add expense',
    'customkey_delete_expense': 'Delete expense',
    'customkey_show_summary': 'Summary',

    /* Misc */
    'error_not_authorized':'You\'re not authorized!',
    'error_invalid_characters':'❌ Error: the value entered ({message.text}) contains invalid characters! ❌',
    'error_command_not_recognized': '❌ Error: command ({message.text}) not recognized! ❌',
    'error_post_request':'❌ Error handling request: {error.message} ❌',
    'error_unknown_callback':'❌ Unknown callback type ❌',
    'error_unable_find_expense': '❌ Error: Unable to find the selected expense ❌',
    'error_showing_summary':'❌ Error showing expense summary: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Use the buttons down here to change the bot\'s language:',
    'command_canceled': '👍 Cancelled. If you have problems, consult the /help page',
    'command_show_help':' ⚙️ Commands\n\n • /start: show the welcome message \n • /help: open this message and get help \n • /cancel: cancel the current command \n • /language: change the bot\'s language \n\n 👤 Contact \n\n • @sickmz',
    'command_show_welcome':'👋 Hi, I\'m Twallet and I can help you keeping track of your expenses!',
    'command_show_welcome_detailed':'✅ What you need to know\n\n 1️⃣ Only you can interact with your bot, thanks to telegram ID-based authentication\n\n 2️⃣ You can add everyday expenses through categories and sections with convenient inline keyboardsn\n\n 3️⃣ You can fully customize categories and sections\n\n 4️⃣ You can delete one of the last 5 expenses entered\n\n 5️⃣ You can check how much you\'ve spent since the beginning of the year, both by month and by category \n\n Remember: if you need help type /help!',
  }
};

function showLanguageOptions(chatId) {
  var language = translations[LANGUAGE];
  var inlineKeyboard = [
    [{ text: (LANGUAGE === 'italian' ? '✅🇮🇹 Italian' : '🇮🇹 Italian'), callback_data: 'language_italian' }],
    [{ text: (LANGUAGE === 'english' ? '✅🇬🇧 English' : '🇬🇧 English'), callback_data: 'language_english' }]
  ];

  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: inlineKeyboard
    })
  };

  sendTelegramMessage(chatId, language['command_language'], options);
}

function setLanguage(chatId, language) {
  LANGUAGE = language;
  PropertiesService.getScriptProperties().setProperty('LANGUAGE', language); 
  var message = '✅ ' + language;
  showMainMenu(chatId, message);
}
