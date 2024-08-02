import { Router } from 'express'
import { ProductController } from '../MVC/controller/products_controller.js'
const router = Router()

// Get all products (or filtered ones by category)
router.get('/', ProductController.getAll)

// Get a product by ID
router.get('/:id', ProductController.getId)

// Create a new product
router.post('/', ProductController.create)

// Update a product
router.patch('/:id', ProductController.modify)

// Delete a product
router.delete('/:id', ProductController.remove)

export default router