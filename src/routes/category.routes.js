import { Router } from "express";
import { createCategory, getAll } from "../controllers/category.controller";

const router = Router()

router.post('/categories', createCategory)

router.get('/categories', getAll)

export default router