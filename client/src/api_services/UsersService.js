const baseURL = 'http://localhost:9000/api/users/'

export const getUsers = () => {
    return fetch(baseURL)
        .then(res => res.json())
}

export const getUser = (id) => {
    return fetch(baseURL + id)
        .then(res => res.json())
}