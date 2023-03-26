1. npm i
2. npm run seeds
3. create .env file in server folder which looks like this
API_KEY=23671263871623  (replace number with api key from finnhub.io)

4. npm run server:dev



base-url  http://localhost:9000/api
Endpoints 
/api/userdata   - all users as a list with owned stock data
/api/userdata:id - one user 



/api/stocks/:symbol  - stock data for one symbol
/api/stocks   - all stock data


TO ADD
