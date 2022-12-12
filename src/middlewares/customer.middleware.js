import connection from "../database/database.js"
import { customerSchema } from "../schemas/customer.schema.js"

export async function customerValidation(req, res, next) {

    const customer = req.body

    const validation = customerSchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)

        res.status(400).send({ message: errors })
        return
    }

    try {

        const cpfExists = await connection.query(`SELECT * FROM customers WHERE cpf=$1;`, [customer.cpf])

        console.log(cpfExists)

        if (cpfExists.rows.length > 0) {
            res.sendStatus(409)
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function customerIdValidation(req, res, next) {

    const { id } = req.params

    try {

        const customerExists = await connection.query(`SELECT id, name, phone, cpf, birthday::text FROM customers WHERE id=$1`, [id])

        if (customerExists.rows.length === 0) {
            res.sendStatus(404)
            return
        }

        res.locals.customer = customerExists.rows[0]

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}