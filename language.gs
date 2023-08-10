var LANGUAGE = PropertiesService.getScriptProperties().getProperty('LANGUAGE') || 'english';
var translations = {

  'italian': {
    'name': '🇮🇹 Italian',

    /* Inline keyboard actions */
    'inline_choose_category': 'Scegli una categoria:',
    'inline_choose_section': 'Scegli una sezione:',
    'inline_enter_price': 'Inserisci il prezzo:',
    'inline_expense_saved': 'Spesa salvata! ✔️\n\nCategoria: {category}\n Sezione: {section}\n Prezzo: {price} €',
    'inline_choose_expense':'Scegli una spesa da eliminare:',
    'inline_expense_deleted': 'Spesa eliminata! ✔️\n\nCategoria: {category}\n Sezione: {section}\n Prezzo: {price} €',
    'inline_global_expenses': '😱 Spese totali: {globalExpenses} €',
    'inline_most_frequent_category': 'Categoria più frequente:',
    'inline_most_frequent_section': 'Sezione più frequente:',
    'inline_occurrences': 'occorrenze',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Aggiungi spesa',
    'customkey_delete_expense': '🥊 Elimina spesa',
    'customkey_show_summary': '💸 Riassunto',

    /* Misc */
    'error_not_authorized':'⛔ Non sei autorizzato ⛔',
    'error_invalid_characters':'❌ Errore: il valore inserito ({message.text}) contiene caratteri non validi! ❌',
    'error_command_not_recognized':'❌ Errore: comando ({message.text}) non riconosciuto! ❌',
    'error_post_request':'❌ Errore nel gestire la richiesta: {error.message} ❌',
    'error_unknown_callback':'❌ Callback sconosciuta ❌',
    'error_unable_find_expense':'❌ Errore: impossibile trovare la spesa selezionata ❌',
    'error_showing_summary':'❌ Errore durante la visualizzazione del riepilogo spese: {error.message} ❌',

    /* Bot commands*/  
    'command_language': '🌍 Usa i pulsanti qui sotto per cambiare la lingua del bot:',
    'command_canceled': '👍 Annullato. Se hai problemi, consulta la pagina /help.',
    'command_show_help':' ⚙️ Comandi\n\n • /start: mostra benvenuto \n • /help: ottieni aiuto \n • /cancel: cancella l\'operazione in corso \n • /language: cambia la lingua del bot \n\n 👤 Contatti \n\n • @sickmz',
    'command_show_welcome':'👋 Ciao, sono Twallet e posso aiutarti a tracciare le spese!',
    'command_show_welcome_detailed':'✅ Cosa devi sapere \n\n 1️⃣ Solo tu puoi interagire con il tuo bot, grazie all\'autenticazione basata sull\'ID Telegram \n\n 2️⃣ Puoi aggiungere le spese quotidiane attraverso categorie e sezioni con comode tastiere inline \n\n 3️⃣ Puoi personalizzare completamente categorie e sezioni\n\n 4️⃣ Puoi eliminare una delle cinque ultime spese inserite\n\n 5️⃣ Puoi controllare quanto hai speso dall\'inizio dell\'anno, sia per mese che per categoria \n\n Ricorda: se hai bisogno di aiuto digita /help!',

  },

  'english': {
    'name': '🇬🇧 English',

    /* Inline keyboard actions */
    'inline_choose_category': 'Choose a category:',
    'inline_choose_section': 'Choose a section:',
    'inline_enter_price': 'Enter the price:',
    'inline_expense_saved': 'Expense saved! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'inline_choose_expense':'Choose the expense to be eliminated:',
    'inline_expense_deleted': 'Expense deleted! ✔️\n\nCategory: {category}\nSection: {section}\nPrice: {price} €',
    'inline_global_expenses': '😱 Global expenses: {globalExpenses} €',
    'inline_most_frequent_category': 'Most frequent category:',
    'inline_most_frequent_section': 'Most frequent section:',
    'inline_occurrences': 'occurrences',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Add expense',
    'customkey_delete_expense': '🥊 Delete expense',
    'customkey_show_summary': '💸 Summary',

    /* Misc */
    'error_not_authorized':'⛔ You\'re not authorized! ⛔',
    'error_invalid_characters':'❌ Error: the value entered ({message.text}) contains invalid characters! ❌',
    'error_command_not_recognized': '❌ Error: command ({message.text}) not recognized! ❌',
    'error_post_request':'❌ Error handling request: {error.message} ❌',
    'error_unknown_callback':'❌ Unknown callback type ❌',
    'error_unable_find_expense': '❌ Error: Unable to find the selected expense ❌',
    'error_showing_summary':'❌ Error showing expense summary: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Use the buttons down here to change the bot\'s language:',
    'command_canceled': '👍 Cancelled. If you have problems, consult the /help page.',
    'command_show_help':' ⚙️ Commands\n\n • /start: show the welcome message \n • /help: open this message and get help \n • /cancel: cancel the current command \n • /language: change the bot\'s language \n\n 👤 Contact \n\n • @sickmz',
    'command_show_welcome':'👋 Hi, I\'m Twallet and I can help you keeping track of your expenses!',
    'command_show_welcome_detailed':'✅ What you need to know\n\n 1️⃣ Only you can interact with your bot, thanks to telegram ID-based authentication\n\n 2️⃣ You can add everyday expenses through categories and sections with convenient inline keyboardsn\n\n 3️⃣ You can fully customize categories and sections\n\n 4️⃣ You can delete one of the last 5 expenses entered\n\n 5️⃣ You can check how much you\'ve spent since the beginning of the year, both by month and by category \n\n Remember: if you need help type /help!',
  },

    'french': {
      'name': '🇫🇷 French',

    /* Inline keyboard actions */
    'inline_choose_category': 'Choisissez une catégorie :',
    'inline_choose_section': 'Choisissez une section :',
    'inline_enter_price': 'Entrez le prix :',
    'inline_expense_saved': 'Dépense enregistrée ! ✔️\n\nCatégorie : {category}\nSection : {section}\nPrix : {price} €',
    'inline_choose_expense':'Choisissez la dépense à supprimer :',
    'inline_expense_deleted': 'Dépense supprimée ! ✔️\n\nCatégorie : {category}\nSection : {section}\nPrix : {price} €',
    'inline_global_expenses': '😱 Dépenses globales : {globalExpenses} €',
    'inline_most_frequent_category': 'Catégorie la plus fréquente :',
    'inline_most_frequent_section': 'Section la plus fréquente :',
    'inline_occurrences': 'occurrences',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Ajouter une dépense',
    'customkey_delete_expense': '🥊 Supprimer une dépense',
    'customkey_show_summary': '💸 Résumé',

    /* Misc */
    'error_not_authorized':'⛔ Vous n\'êtes pas autorisé(e) ! ⛔',
    'error_invalid_characters':'❌ Erreur : la valeur saisie ({message.text}) contient des caractères invalides ! ❌',
    'error_command_not_recognized': '❌ Erreur : commande ({message.text}) non reconnue ! ❌',
    'error_post_request':'❌ Erreur lors du traitement de la requête : {error.message} ❌',
    'error_unknown_callback':'❌ Type de rappel inconnu ❌',
    'error_unable_find_expense': '❌ Erreur : Impossible de trouver la dépense sélectionnée ❌',
    'error_showing_summary':'❌ Erreur lors de l\'affichage du résumé des dépenses : {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Utilisez les boutons ci-dessous pour changer la langue du bot :',
    'command_canceled': '👍 Annulé. Si vous rencontrez des problèmes, consultez la page /help.',
    'command_show_help':'⚙️ Commandes\n\n • /start : affiche le message de bienvenue \n • /help : ouvre ce message et obtient de l\'aide \n • /cancel : annule la commande en cours \n • /language : change la langue du bot \n\n 👤 Contact \n\n • @sickmz',
    'command_show_welcome':'👋 Salut, je suis Twallet et je peux vous aider à suivre vos dépenses !',
    'command_show_welcome_detailed':'✅ Ce que vous devez savoir\n\n 1️⃣ Vous êtes le seul à pouvoir interagir avec votre bot grâce à l\'authentification basée sur votre ID Telegram\n\n 2️⃣ Vous pouvez ajouter des dépenses quotidiennes grâce aux catégories et aux sections avec des claviers en ligne pratiques\n\n 3️⃣ Vous pouvez entièrement personnaliser les catégories et les sections\n\n 4️⃣ Vous pouvez supprimer l\'une des 5 dernières dépenses saisies\n\n 5️⃣ Vous pouvez vérifier combien vous avez dépensé depuis le début de l\'année, mois par mois et par catégorie \n\n N\'oubliez pas : si vous avez besoin d\'aide, tapez /help !',
  },

      'german': {
       'name': '🇩🇪 German',

    /* Inline keyboard actions */
    'inline_choose_category': 'Wähle eine Kategorie:',
    'inline_choose_section': 'Wähle eine Sektion:',
    'inline_enter_price': 'Gib den Preis ein:',
    'inline_expense_saved': 'Ausgabe gespeichert! ✔️\n\nKategorie: {category}\nSektion: {section}\nPreis: {price} €',
    'inline_choose_expense':'Wähle die zu löschende Ausgabe:',
    'inline_expense_deleted': 'Ausgabe gelöscht! ✔️\n\nKategorie: {category}\nSektion: {section}\nPreis: {price} €',
    'inline_global_expenses': '😱 Globale Ausgaben: {globalExpenses} €',
    'inline_most_frequent_category': 'Häufigste Kategorie:',
    'inline_most_frequent_section': 'Häufigste Sektion:',
    'inline_occurrences': 'Vorkommnisse',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Ausgabe hinzufügen',
    'customkey_delete_expense': '🥊 Ausgabe löschen',
    'customkey_show_summary': '💸 Zusammenfassung',

    /* Misc */
    'error_not_authorized':'⛔ Sie sind nicht berechtigt! ⛔',
    'error_invalid_characters':'❌ Fehler: Der eingegebene Wert ({message.text}) enthält ungültige Zeichen! ❌',
    'error_command_not_recognized': '❌ Fehler: Befehl ({message.text}) nicht erkannt! ❌',
    'error_post_request':'❌ Fehler beim Bearbeiten der Anfrage: {error.message} ❌',
    'error_unknown_callback':'❌ Unbekannter Callback-Typ ❌',
    'error_unable_find_expense': '❌ Fehler: Die ausgewählte Ausgabe konnte nicht gefunden werden ❌',
    'error_showing_summary':'❌ Fehler beim Anzeigen der Ausgabenzusammenfassung: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Verwende die unten stehenden Tasten, um die Sprache des Bots zu ändern:',
    'command_canceled': '👍 Abgebrochen. Wenn Sie Probleme haben, konsultieren Sie die /help-Seite.',
    'command_show_help':'⚙️ Befehle\n\n • /start: Zeigt die Willkommensnachricht an \n • /help: Öffnet diese Nachricht und zeigt Hilfe an \n • /cancel: Bricht den aktuellen Befehl ab \n • /language: Ändert die Sprache des Bots \n\n 👤 Kontakt \n\n • @sickmz',
    'command_show_welcome':'👋 Hallo, ich bin Twallet und ich kann Ihnen helfen, Ihre Ausgaben im Blick zu behalten!',
    'command_show_welcome_detailed':'✅ Was Sie wissen müssen\n\n 1️⃣ Nur Sie können mit Ihrem Bot interagieren, dank der Telegram-ID-basierten Authentifizierung\n\n 2️⃣ Sie können tägliche Ausgaben über Kategorien und Sektionen mit praktischen Inline-Tastaturen hinzufügen\n\n 3️⃣ Sie können Kategorien und Sektionen vollständig anpassen\n\n 4️⃣ Sie können eine der letzten 5 eingegebenen Ausgaben löschen\n\n 5️⃣ Sie können überprüfen, wie viel Sie seit Beginn des Jahres ausgegeben haben, sowohl nach Monat als auch nach Kategorie \n\n Denken Sie daran: Wenn Sie Hilfe benötigen, geben Sie /help ein!',
  },

      'spanish': {
        'name': '🇪🇸 Spanish',

    /* Inline keyboard actions */
    'inline_choose_category': 'Elija una categoría:',
    'inline_choose_section': 'Elija una sección:',
    'inline_enter_price': 'Ingrese el precio:',
    'inline_expense_saved': '¡Gasto guardado! ✔️\n\nCategoría: {category}\nSección: {section}\nPrecio: {price} €',
    'inline_choose_expense':'Elija el gasto a eliminar:',
    'inline_expense_deleted': '¡Gasto eliminado! ✔️\n\nCategoría: {category}\nSección: {section}\nPrecio: {price} €',
    'inline_global_expenses': '😱 Gastos globales: {globalExpenses} €',
    'inline_most_frequent_category': 'Categoría más frecuente:',
    'inline_most_frequent_section': 'Sección más frecuente:',
    'inline_occurrences': 'ocurrencias',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Agregar gasto',
    'customkey_delete_expense': '🥊 Eliminar gasto',
    'customkey_show_summary': '💸 Resumen',

    /* Misc */
    'error_not_authorized':'⛔ ¡No estás autorizado! ⛔',
    'error_invalid_characters':'❌ Error: el valor ingresado ({message.text}) contiene caracteres inválidos! ❌',
    'error_command_not_recognized': '❌ Error: comando ({message.text}) no reconocido! ❌',
    'error_post_request':'❌ Error al manejar la solicitud: {error.message} ❌',
    'error_unknown_callback':'❌ Tipo de callback desconocido ❌',
    'error_unable_find_expense': '❌ Error: No se pudo encontrar el gasto seleccionado ❌',
    'error_showing_summary':'❌ Error mostrando el resumen de gastos: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Usa los botones de abajo para cambiar el idioma del bot:',
    'command_canceled': '👍 Cancelado. Si tienes problemas, consulta la página /help.',
    'command_show_help':'⚙️ Comandos\n\n • /start: muestra el mensaje de bienvenida \n • /help: abre este mensaje y obtén ayuda \n • /cancel: cancela el comando actual \n • /language: cambia el idioma del bot \n\n 👤 Contacto \n\n • @sickmz',
    'command_show_welcome':'👋 Hola, soy Twallet y puedo ayudarte a llevar un registro de tus gastos!',
    'command_show_welcome_detailed':'✅ Lo que necesitas saber\n\n 1️⃣ Solo tú puedes interactuar con tu bot, gracias a la autenticación basada en la ID de Telegram\n\n 2️⃣ Puedes agregar gastos diarios a través de categorías y secciones con cómodos teclados en línea\n\n 3️⃣ Puedes personalizar completamente las categorías y secciones\n\n 4️⃣ Puedes eliminar una de las últimas 5 gastos ingresados\n\n 5️⃣ Puedes verificar cuánto has gastado desde el comienzo del año, tanto por mes como por categoría \n\n Recuerda: si necesitas ayuda, escribe /help!',
  },

      'chinese': {
        'name': '🇨🇳 Chinese',

    /* Inline keyboard actions */
    'inline_choose_category': '选择一个类别：',
    'inline_choose_section': '选择一个部分：',
    'inline_enter_price': '输入价格：',
    'inline_expense_saved': '已保存费用！ ✔️\n\n类别：{category}\n部分：{section}\n价格：{price} €',
    'inline_choose_expense':'选择要删除的费用：',
    'inline_expense_deleted': '已删除费用！ ✔️\n\n类别：{category}\n部分：{section}\n价格：{price} €',
    'inline_global_expenses': '😱 全球费用：{globalExpenses} €',
    'inline_most_frequent_category': '最常见的类别：',
    'inline_most_frequent_section': '最常见的部分：',
    'inline_occurrences': '次数',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 添加费用',
    'customkey_delete_expense': '🥊 删除费用',
    'customkey_show_summary': '💸 摘要',

    /* Misc */
    'error_not_authorized':'⛔ 你没有权限！ ⛔',
    'error_invalid_characters':'❌ 错误：输入的值（{message.text}）包含无效字符！ ❌',
    'error_command_not_recognized': '❌ 错误：命令（{message.text}）无法识别！ ❌',
    'error_post_request':'❌ 处理请求时出错：{error.message} ❌',
    'error_unknown_callback':'❌ 未知的回调类型 ❌',
    'error_unable_find_expense': '❌ 错误：找不到所选费用 ❌',
    'error_showing_summary':'❌ 显示费用摘要时出错：{error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 使用下方按钮更改机器人的语言：',
    'command_canceled': '👍 已取消。如果遇到问题，请查阅 /help 页面。',
    'command_show_help':'⚙️ 命令\n\n • /start：显示欢迎消息\n • /help：打开此消息并获取帮助\n • /cancel：取消当前命令\n • /language：更改机器人的语言\n\n 👤 联系\n\n • @sickmz',
    'command_show_welcome':'👋 你好，我是 Twallet，我可以帮助你跟踪你的费用！',
    'command_show_welcome_detailed':'✅ 你需要知道的\n\n 1️⃣ 只有你可以与你的机器人交互，感谢电报 ID 基于身份验证\n\n 2️⃣ 你可以通过类别和部分添加每日费用，使用方便的内联键盘\n\n 3️⃣ 你可以完全自定义类别和部分\n\n 4️⃣ 你可以删除最近输入的 5 条费用之一\n\n 5️⃣ 你可以查看从年初以来的花费情况，包括按月和按类别统计 \n\n 记住：如果需要帮助，请输入 /help！',
  },

      'japanese': {
        'name': '🇯🇵 Japanese',

    /* Inline keyboard actions */
    'inline_choose_category': 'カテゴリーを選択してください：',
    'inline_choose_section': 'セクションを選択してください：',
    'inline_enter_price': '価格を入力してください：',
    'inline_expense_saved': '出費が保存されました！ ✔️\n\nカテゴリー：{category}\nセクション：{section}\n価格：{price} €',
    'inline_choose_expense':'削除する出費を選択してください：',
    'inline_expense_deleted': '出費が削除されました！ ✔️\n\nカテゴリー：{category}\nセクション：{section}\n価格：{price} €',
    'inline_global_expenses': '😱 グローバルな出費：{globalExpenses} €',
    'inline_most_frequent_category': '最も頻繁なカテゴリー：',
    'inline_most_frequent_section': '最も頻繁なセクション：',
    'inline_occurrences': '回数',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 出費を追加',
    'customkey_delete_expense': '🥊 出費を削除',
    'customkey_show_summary': '💸 サマリー',

    /* Misc */
    'error_not_authorized':'⛔ 認証されていません！ ⛔',
    'error_invalid_characters':'❌ エラー：入力された値（{message.text}）には無効な文字が含まれています！ ❌',
    'error_command_not_recognized': '❌ エラー：コマンド（{message.text}）が認識されませんでした！ ❌',
    'error_post_request':'❌ リクエストの処理中にエラーが発生しました：{error.message} ❌',
    'error_unknown_callback':'❌ 不明なコールバックタイプ ❌',
    'error_unable_find_expense': '❌ エラー：選択した出費を見つけることができませんでした ❌',
    'error_showing_summary':'❌ 出費のサマリーを表示中にエラーが発生しました：{error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 下のボタンを使ってボットの言語を変更してください：',
    'command_canceled': '👍 キャンセルされました。問題がある場合は、/help ページを参照してください。',
    'command_show_help':'⚙️ コマンド\n\n • /start：ウェルカムメッセージを表示します \n • /help：このメッセージを開き、ヘルプを取得します \n • /cancel：現在のコマンドをキャンセルします \n • /language：ボットの言語を変更します \n\n 👤 連絡先 \n\n • @sickmz',
    'command_show_welcome':'👋 こんにちは、私はTwalletです。出費の記録を手助けすることができます！',
    'command_show_welcome_detailed':'✅ 知っておくべきこと\n\n 1️⃣ Telegram IDベースの認証により、あなただけがボットとやり取りできます\n\n 2️⃣ 便利なインラインキーボードを使って、毎日の出費をカテゴリーとセクションを使って追加できます\n\n 3️⃣ カテゴリーとセクションを完全にカスタマイズできます\n\n 4️⃣ 直近の5つの出費のうち1つを削除できます\n\n 5️⃣ 年初からの支出額を、月別やカテゴリー別に確認できます \n\n 注意：ヘルプが必要な場合は、/help コマンドを入力してください！',
  },

      'russian': {
        'name': '🇷🇺 Russian',

    /* Inline keyboard actions */
    'inline_choose_category': 'Выберите категорию:',
    'inline_choose_section': 'Выберите раздел:',
    'inline_enter_price': 'Введите цену:',
    'inline_expense_saved': 'Затрата сохранена! ✔️\n\nКатегория: {category}\nРаздел: {section}\nЦена: {price} €',
    'inline_choose_expense': 'Выберите расход для удаления:',
    'inline_expense_deleted': 'Затрата удалена! ✔️\n\nКатегория: {category}\nРаздел: {section}\nЦена: {price} €',
    'inline_global_expenses': '😱 Общие затраты: {globalExpenses} €',
    'inline_most_frequent_category': 'Самая частая категория:',
    'inline_most_frequent_section': 'Самый частый раздел:',
    'inline_occurrences': 'вхождения',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Добавить затрату',
    'customkey_delete_expense': '🥊 Удалить затрату',
    'customkey_show_summary': '💸 Сводка',

    /* Misc */
    'error_not_authorized': '⛔ У вас нет прав доступа! ⛔',
    'error_invalid_characters': '❌ Ошибка: введенное значение ({message.text}) содержит недопустимые символы! ❌',
    'error_command_not_recognized': '❌ Ошибка: команда ({message.text}) не распознана! ❌',
    'error_post_request': '❌ Ошибка при обработке запроса: {error.message} ❌',
    'error_unknown_callback': '❌ Неизвестный тип обратного вызова ❌',
    'error_unable_find_expense': '❌ Ошибка: не удалось найти выбранную затрату ❌',
    'error_showing_summary': '❌ Ошибка отображения сводки затрат: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Используйте кнопки ниже, чтобы изменить язык бота:',
    'command_canceled': '👍 Отменено. Если у вас возникли проблемы, обратитесь к странице /help.',
    'command_show_help': '⚙️ Команды\n\n • /start: показать приветственное сообщение \n • /help: открыть это сообщение и получить помощь \n • /cancel: отменить текущую команду \n • /language: изменить язык бота \n\n 👤 Контакт \n\n • @sickmz',
    'command_show_welcome': '👋 Привет, я Twallet и я могу помочь вам отслеживать ваши затраты!',
    'command_show_welcome_detailed': '✅ Что вам нужно знать\n\n 1️⃣ Вы можете взаимодействовать только вы и ваш бот, благодаря аутентификации на основе ID в Telegram\n\n 2️⃣ Вы можете добавлять повседневные затраты через категории и разделы с удобными встроенными клавиатурами\n\n 3️⃣ Вы можете полностью настраивать категории и разделы\n\n 4️⃣ Вы можете удалить одну из последних 5 введенных затрат\n\n 5️⃣ Вы можете узнать, сколько вы потратили с начала года, как по месяцам, так и по категориям \n\n Помните: если вам нужна помощь, введите команду /help!',
  },

      'portuguese': {
        'name': '🇵🇹 Portuguese',

    /* Inline keyboard actions */
    'inline_choose_category': 'Escolha uma categoria:',
    'inline_choose_section': 'Escolha uma seção:',
    'inline_enter_price': 'Digite o preço:',
    'inline_expense_saved': 'Despesa salva! ✔️\n\nCategoria: {category}\nSeção: {section}\nPreço: {price} €',
    'inline_choose_expense': 'Escolha a despesa a ser eliminada:',
    'inline_expense_deleted': 'Despesa excluída! ✔️\n\nCategoria: {category}\nSeção: {section}\nPreço: {price} €',
    'inline_global_expenses': '😱 Despesas globais: {globalExpenses} €',
    'inline_most_frequent_category': 'Categoria mais frequente:',
    'inline_most_frequent_section': 'Seção mais frequente:',
    'inline_occurrences': 'ocorrências',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Adicionar despesa',
    'customkey_delete_expense': '🥊 Excluir despesa',
    'customkey_show_summary': '💸 Resumo',

    /* Misc */
    'error_not_authorized': '⛔ Você não está autorizado! ⛔',
    'error_invalid_characters': '❌ Erro: o valor inserido ({message.text}) contém caracteres inválidos! ❌',
    'error_command_not_recognized': '❌ Erro: comando ({message.text}) não reconhecido! ❌',
    'error_post_request': '❌ Erro ao lidar com a solicitação: {error.message} ❌',
    'error_unknown_callback': '❌ Tipo de callback desconhecido ❌',
    'error_unable_find_expense': '❌ Erro: Não foi possível encontrar a despesa selecionada ❌',
    'error_showing_summary': '❌ Erro ao mostrar o resumo das despesas: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Use os botões abaixo para mudar o idioma do bot:',
    'command_canceled': '👍 Cancelado. Se tiver problemas, consulte a página /help.',
    'command_show_help': '⚙️ Comandos\n\n • /start: mostra a mensagem de boas-vindas \n • /help: abre esta mensagem e obtém ajuda \n • /cancel: cancela o comando atual \n • /language: muda o idioma do bot \n\n 👤 Contato \n\n • @sickmz',
    'command_show_welcome': '👋 Olá, sou o Twallet e posso ajudá-lo a controlar suas despesas!',
    'command_show_welcome_detailed': '✅ O que você precisa saber\n\n 1️⃣ Apenas você pode interagir com seu bot, graças à autenticação baseada no ID do Telegram\n\n 2️⃣ Você pode adicionar despesas diárias por meio de categorias e seções com teclados inline convenientes\n\n 3️⃣ Você pode personalizar completamente as categorias e seções\n\n 4️⃣ Você pode excluir uma das últimas 5 despesas inseridas\n\n 5️⃣ Você pode verificar quanto gastou desde o início do ano, por mês e por categoria \n\n Lembre-se: se precisar de ajuda, digite /help!'
  },
  'dutch': {
    'name': '🇳🇱 Dutch',

    /* Inline keyboard actions */
    'inline_choose_category': 'Kies een categorie:',
    'inline_choose_section': 'Kies een sectie:',
    'inline_enter_price': 'Voer de prijs in:',
    'inline_expense_saved': 'Uitgave opgeslagen! ✔️\n\nCategorie: {category}\nSectie: {section}\nPrijs: {price} €',
    'inline_choose_expense':'Kies de uitgave die je wilt verwijderen:',
    'inline_expense_deleted': 'Uitgave verwijderd! ✔️\n\nCategorie: {category}\nSectie: {section}\nPrijs: {price} €',
    'inline_global_expenses': '😱 Globale uitgaven: {globalExpenses} €',
    'inline_most_frequent_category': 'Meest voorkomende categorie:',
    'inline_most_frequent_section': 'Meest voorkomende sectie:',
    'inline_occurrences': 'keer',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 Voeg uitgave toe',
    'customkey_delete_expense': '🥊 Verwijder uitgave',
    'customkey_show_summary': '💸 Overzicht',

    /* Misc */
    'error_not_authorized':'⛔ Je bent niet gemachtigd! ⛔',
    'error_invalid_characters':'❌ Fout: de ingevoerde waarde ({message.text}) bevat ongeldige tekens! ❌',
    'error_command_not_recognized':'❌ Fout: opdracht ({message.text}) niet herkend! ❌',
    'error_post_request':'❌ Fout bij het verwerken van het verzoek: {error.message} ❌',
    'error_unknown_callback':'❌ Onbekend callback-type ❌',
    'error_unable_find_expense':'❌ Fout: Kan de geselecteerde uitgave niet vinden ❌',
    'error_showing_summary':'❌ Fout bij het weergeven van de uitgaven samenvatting: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 Gebruik de onderstaande knoppen om de taal van de bot te wijzigen:',
    'command_canceled': '👍 Geannuleerd. Als je problemen hebt, raadpleeg dan de /help pagina.',
    'command_show_help':'⚙️ Opdrachten\n\n • /start: toon het welkomstbericht \n • /help: open dit bericht en krijg hulp \n • /cancel: annuleer de huidige opdracht \n • /language: wijzig de taal van de bot \n\n 👤 Contact \n\n • @sickmz',
    'command_show_welcome':'👋 Hallo, ik ben Twallet en ik kan je helpen om je uitgaven bij te houden!',
    'command_show_welcome_detailed':'✅ Wat je moet weten\n\n 1️⃣ Alleen jij kunt communiceren met je bot, dankzij telegram-ID-gebaseerde authenticatie\n\n 2️⃣ Je kunt dagelijkse uitgaven toevoegen via categorieën en secties met handige inline toetsenborden\n\n 3️⃣ Je kunt categorieën en secties volledig aanpassen\n\n 4️⃣ Je kunt een van de laatste 5 ingevoerde uitgaven verwijderen\n\n 5️⃣ Je kunt controleren hoeveel je hebt uitgegeven sinds het begin van het jaar, zowel per maand als per categorie \n\n Onthoud: als je hulp nodig hebt, typ dan /help!',
  },

  'korean': {
    'name': '🇰🇷 Korean',

    /* Inline keyboard actions */
    'inline_choose_category': '카테고리 선택:',
    'inline_choose_section': '섹션 선택:',
    'inline_enter_price': '가격을 입력하세요:',
    'inline_expense_saved': '지출이 저장되었습니다! ✔️\n\n카테고리: {category}\n섹션: {section}\n가격: {price} €',
    'inline_choose_expense':'삭제할 지출을 선택하세요:',
    'inline_expense_deleted': '지출이 삭제되었습니다! ✔️\n\n카테고리: {category}\n섹션: {section}\n가격: {price} €',
    'inline_global_expenses': '😱 전체 지출: {globalExpenses} €',
    'inline_most_frequent_category': '가장 빈번한 카테고리:',
    'inline_most_frequent_section': '가장 빈번한 섹션:',
    'inline_occurrences': '번',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 지출 추가',
    'customkey_delete_expense': '🥊 지출 삭제',
    'customkey_show_summary': '💸 요약',

    /* Misc */
    'error_not_authorized':'⛔ 권한이 없습니다! ⛔',
    'error_invalid_characters':'❌ 오류: 입력한 값 ({message.text})에 유효하지 않은 문자가 포함되어 있습니다! ❌',
    'error_command_not_recognized':'❌ 오류: 명령어 ({message.text})이(가) 인식되지 않았습니다! ❌',
    'error_post_request':'❌ 요청 처리 오류: {error.message} ❌',
    'error_unknown_callback':'❌ 알 수 없는 콜백 유형 ❌',
    'error_unable_find_expense':'❌ 오류: 선택한 지출을 찾을 수 없습니다 ❌',
    'error_showing_summary':'❌ 지출 요약 표시 오류: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 언어를 변경하려면 아래 버튼을 사용하세요:',
    'command_canceled': '👍 취소되었습니다. 문제가 있으면 /help 페이지를 참조하세요.',
    'command_show_help':'⚙️ 명령어\n\n • /start: 환영 메시지 표시 \n • /help: 이 메시지 열기 및 도움말 얻기 \n • /cancel: 현재 명령 취소 \n • /language: 봇 언어 변경 \n\n 👤 연락처 \n\n • @sickmz',
    'command_show_welcome':'👋 안녕하세요, 저는 Twallet입니다. 지출을 추적하는 데 도움을 드릴 수 있습니다!',
    'command_show_welcome_detailed':'✅ 알아야 할 사항\n\n 1️⃣ 당신만이 Telegram ID 기반 인증을 통해 봇과 상호 작용할 수 있습니다.\n\n 2️⃣ 편리한 인라인 키보드를 통해 카테고리 및 섹션별 일일 지출을 추가할 수 있습니다.\n\n 3️⃣ 카테고리와 섹션을 완전히 사용자 정의할 수 있습니다.\n\n 4️⃣ 최근 5개의 입력한 지출 중 하나를 삭제할 수 있습니다.\n\n 5️⃣ 연도 초부터 현재까지의 지출액을 월별 및 카테고리별로 확인할 수 있습니다. \n\n 기억해주세요: 도움이 필요하면 /help를 입력하세요!',
  },

  'arabic': {
    'name': '🇦🇪 Arabic',

    /* Inline keyboard actions */
    'inline_choose_category': 'اختر الفئة:',
    'inline_choose_section': 'اختر القسم:',
    'inline_enter_price': 'أدخل السعر:',
    'inline_expense_saved': 'تم حفظ المصاريف! ✔️\n\nالفئة: {category}\nالقسم: {section}\nالسعر: {price} €',
    'inline_choose_expense':'اختر المصاريف التي تريد حذفها:',
    'inline_expense_deleted': 'تم حذف المصاريف! ✔️\n\nالفئة: {category}\nالقسم: {section}\nالسعر: {price} €',
    'inline_global_expenses': '😱 المصروفات العامة: {globalExpenses} €',
    'inline_most_frequent_category': 'الفئة الأكثر تكراراً:',
    'inline_most_frequent_section': 'القسم الأكثر تكراراً:',
    'inline_occurrences': 'مرات',

    /* Custom keyboard */
    'customkey_add_expense': '🍕 إضافة مصاريف',
    'customkey_delete_expense': '🥊 حذف مصاريف',
    'customkey_show_summary': '💸 ملخص',

    /* Misc */
    'error_not_authorized':'⛔ أنت غير مخول! ⛔',
    'error_invalid_characters':'❌ خطأ: القيمة المدخلة ({message.text}) تحتوي على أحرف غير صالحة! ❌',
    'error_command_not_recognized':'❌ خطأ: الأمر ({message.text}) غير معروف! ❌',
    'error_post_request':'❌ خطأ في معالجة الطلب: {error.message} ❌',
    'error_unknown_callback':'❌ نوع الاستدعاء غير معروف ❌',
    'error_unable_find_expense':'❌ خطأ: لا يمكن العثور على المصاريف المحددة ❌',
    'error_showing_summary':'❌ خطأ عرض ملخص المصاريف: {error.message} ❌',

    /* Bot commands*/
    'command_language': '🌍 استخدم الأزرار أدناه لتغيير لغة البوت:',
    'command_canceled': '👍 تم الإلغاء. إذا كان لديك مشكلة، استشر صفحة /help.',
    'command_show_help':'⚙️ الأوامر\n\n • /start: عرض رسالة الترحيب \n • /help: فتح هذه الرسالة والحصول على مساعدة \n • /cancel: إلغاء الأمر الحالي \n • /language: تغيير لغة البوت \n\n 👤 الاتصال \n\n • @sickmz',
    'command_show_welcome':'👋 مرحباً، أنا تواليت ويمكنني مساعدتك في تتبع مصاريفك!',
    'command_show_welcome_detailed':'✅ ما تحتاج إلى معرفته\n\n 1️⃣ يمكنك فقط التفاعل مع البوت، بفضل المصادقة على أساس معرف تيليجرام\n\n 2️⃣ يمكنك إضافة مصاريف يومية من خلال فئات وأقسام باستخدام لوحات مفاتيح مدمجة مريحة\n\n 3️⃣ يمكنك تخصيص فئات وأقسام بشكل كامل\n\n 4️⃣ يمكنك حذف واحدة من أحدث 5 مصاريف تم إدخالها\n\n 5️⃣ يمكنك التحقق من كم قد أنفقت منذ بداية العام، سواء بالشهر أو حسب الفئة \n\n تذكر: إذا كنت بحاجة إلى مساعدة، اكتب /help!',
  }
};

function showLanguageOptions(chatId) {
  var language = translations[LANGUAGE];
  var inlineKeyboard = [
    [
      { text: (LANGUAGE === 'italian' ? '✅ 🇮🇹 it' : '🇮🇹 it'), callback_data: 'language_italian'},
      { text: (LANGUAGE === 'english' ? '✅ 🇬🇧 en' : '🇬🇧 en'), callback_data: 'language_english'},
      { text: (LANGUAGE === 'french' ? '✅ 🇫🇷 fr' : '🇫🇷 fr'), callback_data: 'language_french'}
    ],
    [
      { text: (LANGUAGE === 'german' ? '✅ 🇩🇪 de' : '🇩🇪 de'), callback_data: 'language_german'},
      { text: (LANGUAGE === 'spanish' ? '✅ 🇪🇸 es' : '🇪🇸 es'), callback_data: 'language_spanish'},
      { text: (LANGUAGE === 'portuguese' ? '✅ 🇵🇹 pt' : '🇵🇹 pt'), callback_data: 'language_portuguese'}
    ],
    [
      { text: (LANGUAGE === 'chinese' ? '✅ 🇨🇳 cn' : '🇨🇳 cn'), callback_data: 'language_chinese'},
      { text: (LANGUAGE === 'japanese' ? '✅ 🇯🇵 jp' : '🇯🇵 jp'), callback_data: 'language_japanese'},
      { text: (LANGUAGE === 'korean' ? '✅ 🇰🇷 kr' : '🇰🇷 kr'), callback_data: 'language_korean'}

    ],
    [
      { text: (LANGUAGE === 'russian' ? '✅ 🇷🇺 ru' : '🇷🇺 ru'), callback_data: 'language_russian'},
      { text: (LANGUAGE === 'dutch' ? '✅ 🇳🇱 nl' : '🇳🇱 nl'), callback_data: 'language_dutch'},
      { text: (LANGUAGE === 'arabic' ? '✅ 🇦🇪 ae' : '🇦🇪 ae'), callback_data: 'language_arabic'}
    ]
  ];

  var options = {reply_markup: JSON.stringify({inline_keyboard: inlineKeyboard})};
  sendTelegramMessage(chatId, language['command_language'], options);
}

function setLanguage(chatId, language) {
  LANGUAGE = language;
  PropertiesService.getScriptProperties().setProperty('LANGUAGE', language);
  var message = '✅ Language set to: ' + translations[language].name;

  showMainMenu(chatId, message);
}
