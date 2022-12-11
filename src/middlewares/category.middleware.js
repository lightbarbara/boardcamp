import { connection } from "../database/database.js"
import { categorySchema } from "../schemas/category.schema"

export async function categoryValidation(req, res, next) {

    const { name } = req.body

    if (!name) {
        res.status(400).send({ message: 'You must send a name for the category' })
        return
    }

    const validation = categorySchema.validate(req.body, { abortEarly: false })

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message)

        res.status(422).send({ message: errors })
        return
    }

    try {

        const nameExists = await connection.query(`SELECT * FROM categories WHERE name=$1`, [name])

        if (nameExists) {
            res.sendStatus(409)
        }

        next()

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}