import { Router } from "express";
import { createCustomer, findAllCustomers, findCustomerById, updateCustomer } from "../controllers/customer.controller.js";
import { customerValidation } from "../middlewares/customer.middleware.js";

const router = Router()

router.post('/customers', customerValidation, createCustomer)

router.get('/customers', findAllCustomers)

router.get('/customers/:id', findCustomerById)

router.put('/customers/:id', updateCustomer)

export default router