// import { ProductModel } from '../model/products_model.js' <-- Manages data on a local JSON
import { ProductModel } from '../model/mongoDB_products_model.js' // <-- Manages data on a MongoDB Database
import { validateProduct, partiallyValidateProduct } from '../../productSchema.js'

export class ProductController {
    // Obtain all products (or filter by category, if any)
    static async getAll(req, res) {
        const { category } = req.query
        const products = await ProductModel.getAll({ category })
        res.json(products)
    }

    // Obtain a product by ID
    static async getId(req, res) {
        const { id } = req.params
        
        const product = await ProductModel.getId({ id })
        if (product) return res.json(product)
        res.status(404).json({ message: 'Producto no encontrado' })
    }

    // Create a new product
    static async create(req, res) {
        const result = validateProduct(req.body)
        if (result.error) return res.status(422).json({ message: JSON.parse(result.error.message) })

        const newProduct = await ProductModel.create({ input: result.data })
        res.status(201).json(newProduct)
    }

    // Modify a product information
    static async modify(req, res) {
        const { id } = req.params
        const result = partiallyValidateProduct(req.body)
        if (result.error) return res.status(422).json({ message: JSON.parse(result.error.message) })

        const modifiedProduct = await ProductModel.modify({ id, input: result.data })
        if (modifiedProduct === false) return res.status(404).json({ message: 'Producto no encontrado' })
        res.json(modifiedProduct)
    }

    // Delete a product
    static async remove(req, res) {
        const { id } = req.params

        const deleteProduct = await ProductModel.remove({ id })
        if (deleteProduct === false) return res.status(404).json({ message: 'Producto no encontrado' })
        res.json({ message: 'Producto eliminado exitosamente' })
    }
}