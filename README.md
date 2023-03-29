# Shares Portfolio Application

![name](https://github.com/Neil-Burgoyne/Shares-Portfolio-Application/blob/main/Diagrams/Shares%20App%20Homepage.png)

A local trader has come to you with a portfolio of shares. She wants to be able to analyse it more effectively. She has a small sample data set to give you and would like you to build a Minimum Viable Product that uses the data to display her portfolio so that she can make better decisions.

## MVP

A user should be able to:

- view total current value.
- view individual and total performance trends.
- retrieve a list of share prices from an external API and allow the user to add shares to her portfolio.
- View a chart of the current values in her portfolio.

## Project Setup

#### Inside Server Folder:

Install required node modules:
```
npm i
```
Run seed file to populate app with template data:
```
npm run seeds
```
Create .env file in the server folder, add the following code and insert the API key from finnhub.io:

API_KEY="api key"

Start the server:
```
npm run server:dev
```
#### Inside Client Folder:

Install required node modules:
```
npm i
```
Start the app:
```
npm start
```