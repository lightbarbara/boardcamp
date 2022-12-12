import { Router } from "express";
import { deleteRental, findAllRentals, postRental, returnRental } from "../controllers/rental.controller.js";
import { rentalDeleteValidation, rentalReturnValidation, rentalValidation } from "../middlewares/rental.middleware.js";

const router = Router()

router.post('/rentals', rentalValidation, postRental)

router.post('/rentals/:id/return', rentalReturnValidation, returnRental)

router.get('/rentals', findAllRentals)

router.delete('/rentals/:id', rentalDeleteValidation, deleteRental)

export default router