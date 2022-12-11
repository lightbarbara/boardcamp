import { Router } from "express";
import { createCategory, getAll } from "../controllers/category.controller.js";
import { categoryValidation } from "../middlewares/category.middleware.js";

const router = Router()

router.get('/categories', getAll)

router.use(categoryValidation)

router.post('/categories', createCategory)

export default router