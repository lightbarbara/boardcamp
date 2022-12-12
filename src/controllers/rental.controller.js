import dayjs from 'dayjs'
import connection from '../database/database.js'

export async function postRental(req, res) {

    const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = res.locals.rental

    try {

        await connection.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])

        res.sendStatus(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function returnRental(req, res) {

    const { rental } = res.locals

    const today = dayjs().format('YYYY-MM-DD').toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }).slice(0, 11)

    const dueDate = new Date(rental.rentDate).getTime() + (rental.daysRented * 1000 * 60 * 60 * 24)

    const days = Math.ceil((new Date(today).getTime() - dueDate) / (1000 * 60 * 60 * 24))

    let delayFee

    if (days > 0) {
        delayFee = (rental.originalPrice / rental.daysRented) * days
    }

    try {

        await connection.query(`UPDATE rentals SET "delayFee"=$1, "returnDate"=$2 WHERE id=$3;`, [delayFee, today, rental.id])

        res.sendStatus(200)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

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
        rentals.id, rentals."customerId", rentals."gameId", rentals."rentDate"::text, rentals."daysRented", rentals."daysRented", rentals."returnDate"::text, rentals."originalPrice", rentals."delayFee", jsonb_build_object('id', customers.id, 'name', customers.name) AS "customer", jsonb_build_object('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS "game"
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