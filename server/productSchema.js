import zod from 'zod'

const productSchema = zod.object({
    nombre: zod.string({
        required_error: 'el producto requiere un nombre'
    }),
    cantidad: zod.number({
        required_error: 'el producto requiere una cantidad de ingreso'
    }).int().positive(),
    precio: zod.number({
        required_error: 'el producto requiere un precio de venta'
    }).positive(),
    categoria: zod.string({
        required_error: 'el producto requiere una categoría'
    })
})

export function validateProduct(object) {
    return productSchema.safeParse(object)
}

export function partiallyValidateProduct(object) {
    return productSchema.partial().safeParse(object)
}