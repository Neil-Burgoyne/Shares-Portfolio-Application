import React, { useState, useEffect } from 'react'
import { getStocks, getStock } from '../api_services/StocksService';
import { getUsers, getUser } from '../api_services/UsersService';

const ApiTest = () => {
    // const [allStocks, setAllStocks] = useState([]);
    // const [stock, setStock] = useState({});
    // const [allUsers, setUsers] = useState([]);
    // const [user, setUser] = useState({});

    // useEffect(() => {
    //     const fetchStocks = async () => {
    //         const stocks = await getStocks()
    //         setAllStocks(stocks);
    //     }
    //     fetchStocks();
    // }, [])

    // useEffect(() => {
    //     const fetchStock = async (symbol) => {
    //         const stock = await getStock(symbol)
    //         setStock(stock);
    //     }
    //     fetchStock("AAPL");
    // }, [])

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const users = await getUsers()
    //         setUsers(users);
    //     }
    //     fetchUsers();
    // }, [])

    // useEffect(() => {
    //     const fetchUser = async (id) => {
    //         const user = await getUser(id)
    //         setUser(user);
    //     }
    //     fetchUser("642167b19ac0f323d0882a48");
    // }, [])


    return (<h1>ApiTest</h1>);
}

export default ApiTest;