import connection from "../database/database.js"
import { rentalSchema } from "../schemas/rental.schema.js"
import dayjs from 'dayjs'

export async function rentalValidation(req, res, next) {

    let rental = req.body

    try {

        const gameRentals = await connection.query(`SELECT * FROM rentals WHERE id=$1;`, [rental.gameId])

        const gameStock = await connection.query(`SELECT "stockTotal" FROM games WHERE id=$1;`, [rental.gameId])

        const gameAvailable = gameStock.rows[0].stockTotal - gameRentals.rows.length

        if (gameAvailable <= 0) {
            res.sendStatus(400)
        }

        const customerExists = await connection.query(`SELECT * FROM customers WHERE id=$1;`, [rental.customerId])

        if (customerExists.rows.length === 0) {
            res.sendStatus(400)
            return
        }

        const gameExists = await connection.query(`SELECT * FROM games WHERE id=$1;`, [rental.gameId])

        if (gameExists.rows.length === 0) {
            res.sendStatus(400)
            return
        }

        let price = await connection.query(`SELECT "pricePerDay" FROM games WHERE id=$1;`, [rental.gameId])

        price = price.rows[0].pricePerDay * rental.daysRented

        rental = {
            ...rental,
            rentDate: dayjs().format('YYYY-MM-DD'),
            originalPrice: price,
            returnDate: null,
            delayFee: null
        }
    
        const validation = rentalSchema.validate(rental, { abortEarly: false })
    
        if (validation.error) {
            const errors = validation.error.details.map(detail => detail.message)
    
            res.status(400).send({ message: errors })
            return
        }

        res.locals.rental = rental

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}