import { Router } from "express";
import { deleteRental, findAllRentals, postRental, returnRental } from "../controllers/rental.controller.js";

const router = Router()

router.post('/rentals', postRental)

router.post('/rentals/:id/return', returnRental)

router.get('/rentals', findAllRentals)

router.delete('/rentals/:id', deleteRental)

export default router