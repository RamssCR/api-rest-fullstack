# API de productos con Express y MongoDB
    - Esta es una API de ejercicio usando Express y MongoDB como base de datos

> URL de la API

    - http://localhost:2000/products

# Peticiones GET

> Para traer todos los datos

    - http://localhost:2000/products

> Para filtrar por categoría

    - http://localhost:2000/products?category=categoria // ("frutas", "hortalizas", "lacteos", etc...)

> Para traer solo un producto

    - http://localhost:2000/products/id

# Peticiones POST

> Para crear un producto

    - http://localhost:2000/products
    - Formato JSON:
```JSON
        {
            "nombre": nombre del producto (string),
            "cantidad": cantidad almacenada (int),
            "precio": precio del producto (int),
            "categoria": categoría del producto (string)
        }
```

**A TENER EN CUENTA**
    - Todos los campos son obligatorios y deben cumplir con el tipo de dato de cada uno al momento de realizar la petición.

# Peticiones PATCH

> Para actualizar o modificar un producto

    - http://localhost:2000/products/id
    - Formato JSON:
```JSON
        {
            "nombre": nombre del producto (string),
            "cantidad": cantidad almacenada (int),
            "precio": precio del producto (int),
            "categoria": categoría del producto (string)
        }
```


**A TENER EN CUENTA**
    - No todos los campos son obligatorios. Los campos a usar para editar información deben cumplir con el tipo de dato de cada uno al momento de realizar la petición.

> Ejemplo: Actualizar la cantidad y precio de un producto.
```JSON
    {
        "cantidad": 120,
        "precio": 4500
    }
```

# Peticiones DELETE

> Para eliminar un producto

    - http://localhost:2000/products/id