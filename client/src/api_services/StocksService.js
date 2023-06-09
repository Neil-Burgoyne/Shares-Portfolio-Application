const baseURL = 'http://localhost:9000/api/stocks/'

export const getStocks = () => {
    return fetch(baseURL)
        .then(res => res.json())
}

export const getStock = (symbol) => {
    return fetch(baseURL + symbol)
        .then(res => res.json())
}

export const getNews = () => {
    return fetch(baseURL + "news")
        .then(res => res.json())
}

export const getNewsSymbol = (symbol) => {
    return fetch(baseURL + "news/" + symbol)
        .then(res => res.json())
}

export const getImageSymbol = (symbol) => {
    return fetch(baseURL + "image/" + symbol)
        .then(res => res.json())
}


// export const postStock = (symbol) => {
//     return fetch(baseURL, {
//         method: 'POST',
//         body: JSON.stringify(payload),
//         headers: { 'Content-Type': 'application/json' }
//     })
//         .then(res => res.json())
// }

// export const deleteStock = (symbol) => {
//     return fetch(baseURL + id, {
//         method: 'DELETE'
//     })
// }



