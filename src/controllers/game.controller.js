import connection from '../database/database.js'

export async function getAllGames(req, res) {

    let { name } = req.query

    try {

        if (name) {
            name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

            const gamesFiltered = await connection.query(`SELECT * FROM games WHERE name LIKE '${name}%'`)

            res.status(200).send(gamesFiltered.rows)
            return
        }

        const games = await connection.query(`SELECT * FROM games`)

        res.status(200).send(games.rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function addGame(req, res) {

    let { name, image, stockTotal, categoryId, pricePerDay } = req.body

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()

    try {

        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [name, image, stockTotal, categoryId, pricePerDay])

        res.sendStatus(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}