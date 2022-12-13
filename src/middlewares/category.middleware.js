import connection from "../database/database.js"
import { categorySchema } from "../schemas/category.schema.js"

export async function categoryValidation(req, res, next) {

    let { name } = req.body

    name = name.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ')

    const validation = categorySchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)

        res.status(400).send({ message: errors })
        return
    }

    try {

        const nameExists = await connection.query(`SELECT * FROM categories WHERE name=$1;`, [name])

        if (nameExists.rows.length > 0) {
            res.sendStatus(409)
            return
        }

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}