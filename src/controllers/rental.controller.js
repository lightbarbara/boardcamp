import connection from '../database/database.js'
import dayjs from 'dayjs'

export async function postRental(req, res) {



}

export async function returnRental(req, res) {



}

export async function findAllRentals(req, res) {

    const { customerId, gameId } = req.query

    let rentals

    try {

        if (customerId && gameId) {
            rentals = await connection.query(`
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
            WHERE
                customers.id = ${customerId}
            AND
                games.id = ${gameId}
            `)
        } else if (customerId) {
            rentals = await connection.query(`
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
            WHERE
                customers.id = ${customerId}
            `)
        } else if (gameId) {
            rentals = await connection.query(`
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
            WHERE
                games.id = ${gameId}
            `)
        } else {
            rentals = await connection.query(`
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
            `)
        }

        res.status(200).send(rentals.rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function deleteRental(req, res) {



}