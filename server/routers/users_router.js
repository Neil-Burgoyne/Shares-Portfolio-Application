const express = require("express")
const { parseUserData, parseUsersData } = require("../parsers/user_data_parser")
const { getUserData, getUsersData, stockTransaction } = require("../repositories/users_repository")

const usersRouter = function () {
    const router = express.Router()
    router.get('/', async (req, res) => {
        try {
            const data = await getUsersData();
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    router.get('/:id', async (req, res) => {
        try {
            const id = req.params.id
            const data = await getUserData(id);
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    router.post('/:id/transaction', async (req, res) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            const data = await stockTransaction(id, payload);
            res.json(data);
        } catch (err) {
            console.error(err)
            res.status(500)
            res.json({ status: 500, error: err })
        }
    })

    return router

}

module.exports = usersRouter