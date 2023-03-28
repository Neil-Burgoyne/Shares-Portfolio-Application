const baseURL = 'http://localhost:9000/api/users/'

export const getUsers = () => {
    return fetch(baseURL)
        .then(res => res.json())
}

export const getUser = (id) => {
    return fetch(baseURL + id)
        .then(res => res.json())
}

// type can be "sale" or "purchase"
export const transaction = (userId, stockSymbol, quantity, price, type) => {
    const payload = { stockSymbol, quantity, price, type };
    return fetch(baseURL + userId + '/transaction', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
}

