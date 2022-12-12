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



}

export async function findCustomerById(req, res) {



}

export async function updateCustomer(req, res) {



}
