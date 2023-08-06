// The Telegram bot token obtained from the Telegram BotFather to authenticate API requests
var TELEGRAM_TOKEN = ''; 

// The ID of the Google Sheet where expense data is stored
var SHEET_ID = ''; 

// The name of the sheet within the Google Sheet where expense data is stored
var SHEET_NAME = ''; 

// The URL of the deployed Web App, used for setting up the webhook
var WEBAPP_URL = ''; 

// The user ID (Telegram chat ID) that is authorized to access the Bot
var USER_ID = ''; 

// The timezone used for date formatting and calculations (Europe/Rome in this case)
var TIMEZONE = "Europe/Rome";

// Object representing different expense categories and their corresponding subcategories
var categories = { 
  'house': ['gas', 'water', 'tax'],
  'food': ['groceries', 'delivery'],
  'finance': ['brokers', 'banks', 'exchanges']
};
