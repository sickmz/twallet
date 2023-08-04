function setWebhook() {
  try {
    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook?url=${WEBAPP_URL}`;
    var response = UrlFetchApp.fetch(url);
  } catch (error) {
    Logger.log('Error setting up webhook: ' + error.message);
  }
}

function sendTelegramMessage(chatId, text, options) {
  try {
    options = options || {};
    options.chat_id = chatId;
    options.text = text;

    var url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    var payload = JSON.stringify(options);
    var params = {
      method: 'post',
      contentType: 'application/json',
      payload: payload
    };

    UrlFetchApp.fetch(url, params);
  } catch (error) {
    Logger.log('Error sending Telegram message: ' + error.message);
  }
}
