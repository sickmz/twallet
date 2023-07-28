# twallet
Apps Script to save and delete personal expenses on a Google Sheet through a telegram bot (categories and sections are dependent lists with conditional validation)

- Add an expense with a category, section and price (category and section are two inline keyboards with conditional validation, the section depends on the chosen category)
- Expense deletion allows you to delete one of the last *N* expenses recorded through an inline keyboard
- Show the total of all expenses by category and by month
- Highly customizable categories and sections
- Secure and controlled access through ID control: only your telegram account can interact with the bot

# Demo

| Add expense | Delete expense |
|:-----------------:|:-----------------:|
| ![Add expense](add.gif) | ![Delete expense](delete.gif)
  
#  Installation
* Create a generic google sheet and copy the spreedsheet ID
* Create a Telegram bot via @BotFather and get the token
* Add the handler.gs App Script to google sheet. Follow this Google guide to learn how to add a new App Script: **[How to add an App Script to a Google Sheet](https://developers.google.com/apps-script/guides/sheets/functions)**
* Deploy App Script as Web Application
    - Perform a new deployment of the App Script as a Web Application.
    - Type: **Web Application**
    - Description: **as you prefer** (e.g. WebAppDeploy)
    - Execute as: **Me**
    - Access authorization: **Everyone**
    - Click on **Execute Deployment**
    - Click on **Authorize Access**
    - Click on **Advanced** in bottom left corner
    - Click on **Open (app script name) (not secure)**
    - Click on **Allow**
    - Save the webapp url generated (e.g. https://script.google.com/macros/s/AKfycbwHkLLHeAY-07_A2dmXftSX0JNR8gTpeREQmzo2j2aWmItIuSsFSYzlB1bJNw0Dovd3qw/exec)
    - Click on **Finish**
* App Script personalization
  - Enter all the tokens/IDs saved in the previous steps
  - To extract your telegram ID and protect the bot from access by other users you can use @userinfobot
  - Customize categories and sections
* Update App script deployment:
  - Click on **Execute deployment**
  - Click on **Manage deployment**
  - Click on **Modify icon**
  - Click on **Version**
  - Click on **New Version**
* Execute  *setWebhook* functions
* Enjoy

# Thanks
- R3D4NG3L for the telegram ID verification {checkUserAutentication()}
