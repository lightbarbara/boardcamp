import connection from '../database/database.js'

export async function createCustomer(req, res) {

    let { name, phone, cpf, birthday } = req.body

    name = name.split(' ').map(n => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase()).join(' ')

    try {

        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [name, phone, cpf, birthday])

        res.sendStatus(201)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function findAllCustomers(req, res) {

    let { cpf } = req.query

    try {

        if (cpf) {

            const customersFiltered = await connection.query(`SELECT * FROM customers WHERE cpf LIKE '${cpf}%'`)

            res.status(200).send(customersFiltered.rows)
            return
        }

        const customers = await connection.query(`SELECT name, phone, cpf, birthday::text FROM customers`)

        res.status(200).send(customers.rows)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

}

export async function findCustomerById(req, res) {



}

export async function updateCustomer(req, res) {



}
