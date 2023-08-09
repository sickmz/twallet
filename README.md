# 🤖 twallet 

This script is a Telegram bot that helps track personal expenses. It is designed to run on Google Apps Script, a scripting platform for Google services. In particular, this script saves data directly to Google Sheets.

To test it:
- [Demo Telegram bot](https://t.me/demorip_bot)
- [Demo spreadsheet](https://docs.google.com/spreadsheets/d/1-vqkkmkUpqK-Q-Xr_Ju6W0MFXdfYfdFrDr8ZY5QrwP8/edit#gid=0)
  

## Features

- **Initial Configuration**: initialize variables in parameters.gs such as the Telegram bot token, Google Sheets ID, WebAppa URL, and other configuration settings. You will also need to configure the `categories` object that contains the categories and expense sections.

- **Post request handling**: the `doPost` function is called when the bot receives a POST request from Telegram. This function analyzes the content of the request and sends the request to the appropriate handler based on the type of action (`callback` or `message`):
  - **Management of callback actions**: the `handleCallback` function handles actions associated with inline buttons on the Telegram keyboard (called callbacks). Depending on the type of callback, the code performs actions such as deleting an expense, selecting a category or section.
  - **Message handling**: the `handleMessage` function handles messages sent by users to the bot. Depending on the content of the message, the bot displays a welcome message, lists the available commands, starts the process of adding or deleting an expense, or handles the price entry of an expense.

- **Adding an expense**: when you select the button to add an expense, the bot displays the available categories. The user then selects a category and then a section. Finally, the bot prompts the user to enter the price of the expense and saves it in the spreadsheet.

- **Deleting an expense**: when you select the button to delete an expense, the bot displays the last 5 expenses entered and allows the user to select one to delete. Once selected, the bot deletes the expense from your spreadsheet.

- **Expense Summary**: The bot provides a summary of expenses by category and by month, showing the total amount of expenses for each category and for each month (and also the major frequency of categories and sections).

- **Language setting**: multilingual support is provided and it is possible to change the language of the bot. If you don't find your language and want to contribute open a pull request.

- **Secure access through ID control**: The bot is designed to allow only a specific user to interact with it, based on the user ID provided by Telegram and configured in `parameters.gs`.

## Demo

| Add expense | Delete expense | Summary |
|:-----------------:|:-----------------:|:-----------------:|
| ![Add expense](demo/add.gif) | ![Delete expense](demo/delete.gif) | ![Summary](demo/summary.gif)
  
## Installation

Follow these steps to set up the `twallet` Telegram bot and start tracking your expenses:

1. Create a generic Google Sheet and copy the Spreadsheet ID.
   - Go to Google Drive and create a new Google Sheet.
   - Copy the unique ID from the URL of the newly created sheet. The ID is a long string of letters and numbers after `/spreadsheets/d/`.

2. Create a Telegram bot via @BotFather and get the token and retrieve your telegram user id.
   - Open Telegram and search for the `@BotFather` bot.
   - Start a chat with `@BotFather` and use the `/newbot` command to create a new bot.
   - Follow the instructions and get the generated bot token. Save this token for later use.
   - Go to the Bot [getUserInfo](https://t.me/userinfobot) and retrieve your Telegram user id. Save this id for later use.

3. Add all the `.gs` files in this repo to Apps Script.
   - Open the Google Sheet created in step 1.
   - Go to "Extensions" in the menu and select "Apps Script".
   - It will open a new tab with the Google Apps script editor. Import all scripts from this repo into Apps Script.

4. Deploy the App Script as a Web Application.
   - Click on the "Deploy" menu in the Apps Script editor and select "Deploy as web app".
   - Choose "Web application" as the deployment type.
   - Provide a description (e.g., "WebAppDeploy") as you prefer.
   - Set "Execute as" to "Me".
   - Under "Who has access to the app," choose "Anyone, even anonymous."
   - Click on "Deploy" to deploy the web application.
   - A dialog will prompt you to review the permissions needed by the app. Click "Authorize access" to proceed.

5. Save the WebApp URL generated.
   - After authorization, you will get a WebApp URL, like `https://script.google.com/macros/s/YourWebAppID/exec`. Save this URL for later use.

6. App Script Personalization.
   - Open the `parameters.gs` script in the Apps Script editor.
   - Insert into variables `TELEGRAM_TOKEN`, `SHEET_ID`, `SHEET_NAME`, `USER_ID` and `WEBAPP_URL` the tokens/IDs saved in the previous steps. If necessary, edit the `TIMEZONE`.

7. Customize categories and sections.
   - Update the `categories` object in the `parameters.gs` script to customize the categories and sections according to your preferences.

8. Update App Script deployment.
   - In the Apps Script editor, go to the "Deploy" menu and select "Manage deployments."
   - Click on the modify icon (pencil) next to the "WebAppDeploy" deployment.
   - Click on "Version" and then "New Version" to create a new version of the deployment.

9. Execute `setWebhook` functions.
   - In the Apps Script editor, click on the "Run" menu and select "Run function" -> `setWebhook`.
   - This function will set up the webhook for your bot, allowing it to receive updates from Telegram.

10. Enjoy!
    - Your `twallet` Telegram bot is now ready to use. Happy budget tracking with `twallet`!
   
## Contact
-  [Telegram](https://t.me/sickmz)
