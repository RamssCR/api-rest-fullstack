import { require } from "../../util.js"
import { randomUUID } from 'node:crypto'

const products = require('./router/products.json')

export class ProductModel {
    // obtain all products or by category (if any)
    static async getAll({ category }) {
        if (category) {
            return products.filter(c => c.categoria.toLowerCase() === category.toLowerCase())
        }

        return products
    }

    // obtain a product by ID
    static async getId({ id }) {
        return products.find(product => product.id === id)
    }

    // create a new product
    static async create({ input }) {
        const newProduct = {
            id: randomUUID(),
            ...input
        }

        products.push(newProduct)
        return newProduct
    }

    // modify a product information
    static async modify({ id, input }) {
        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex === -1) return false

        const modifiedProduct = {
            ...products[productIndex],
            ...input
        }

        products[productIndex] = modifiedProduct
        return modifiedProduct
    }

    // delete a product
    static async remove({ id }) {
        const productIndex = products.findIndex(product => product.id === id)

        if (productIndex === -1) return false
        products.splice(productIndex, 1)

        return true
    }
}