# CodeClan - JavaScript Group Project

<kbd>
 <img width="250" alt="Atlas Wealth Logo" src="">
 </kbd>
 <br></br>

Atlas Wealth is a full-stack web application intended to help the client to record the held shares and track the market value changes.

This project was built using:

- React JS
- Express.js
- MongoDB
- Styled with MaterialUI
- TDD - Mocha | Cypress
- Finnhub API

<span>
<img height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/react/react-original.svg">
<img height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/express/express-original.svg">
<img height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/mongodb/mongodb-original.svg">
<img height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/materialui/materialui-plain.svg">
<img height="50px" src="https://github.com/devicons/devicon/blob/v2.15.1/icons/mocha/mocha-plain.svg">
</span>

<br>

![name](https://github.com/Neil-Burgoyne/Shares-Portfolio-Application/blob/main/Diagrams/Shares%20App%20Homepage.png)

## Brief

A local trader has come to you with a portfolio of shares. She wants to be able to analyse it more effectively. She has a small sample data set to give you and would like you to build a Minimum Viable Product that uses the data to display her portfolio so that she can make better decisions.

### MVP

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

## Contributors:

[Chris](https://github.com/doublerdiner) | [Neil](https://github.com/Neil-Burgoyne) | [Ross](https://github.com/rosscondie) | [Tim](https://github.com/TimoHenderson)
