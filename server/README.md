1. npm i
2. npm run seeds
3. create .env file in server folder which looks like this
API_KEY=23671263871623  (replace number with api key from finnhub.io)

4. npm run server:dev



base-url  http://localhost:9000/api
Endpoints 
/api/userdata   - all users as a list with owned stock data
/api/userdata:id - one user 



/api/stockdata/stocks/:symbol  - stock data for one symbol //need to add company name to object
/api/stockdata/stocksymbols   - list of all available stocks and company full name


TO ADD
