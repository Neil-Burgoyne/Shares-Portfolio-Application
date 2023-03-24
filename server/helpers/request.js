const apiKey = process.env.API_KEY;
fetch(url, {
  headers: {
    'X-API-KEY': apiKey
    }
})
  .then(/* ... */);