import connection from '../database/database.js'

export async function postRental(req, res) {

    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = res.locals.rental

    try {

        await connection.query(`INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee) VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.sendStatus(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function returnRental(req, res) {



}

export async function findAllRentals(req, res) {

    const { customerId, gameId } = req.query

    let where

    if (customerId && gameId) {
        where = `WHERE customers.id = ${customerId} AND games.id = ${gameId}`
    } else if (customerId) {
        where = `WHERE customers.id = ${customerId}`
    } else if (gameId) {
        where = `WHERE games.id = ${gameId}`
    } else {
        where = ''
    }

    try {

        const rentals = await connection.query(`
        SELECT
            rentals.*, jsonb_build_object('id', customers.id, 'name', customers.name) AS "customer", jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS "game"
        FROM
            customers
        JOIN
            rentals
        ON
            customers.id = rentals."customerId"
        JOIN
            games
        ON
            games.id = rentals."gameId"
        JOIN
            categories
        ON
            games."categoryId" = categories.id
        ${where}
        `)

        res.status(200).send(rentals.rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteRental(req, res) {

    const { id } = res.locals

    try {

        await connection.query(`DELETE FROM rentals WHERE id=$1`, [id])

        res.sendStatus(200)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}