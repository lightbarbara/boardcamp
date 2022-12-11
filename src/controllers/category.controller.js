import connection from '../database/database.js'

export async function createCategory(req, res) {

    const { name } = req.body

    try {

        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name])

        res.sendStatus(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function getAll(req, res) {

    try {

        const categories = await connection.query(`SELECT * FROM categories`)

        res.status(200).send(categories)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}