const { db_connection } = require("../config/database");

const getProductoId = async (id) => {
    try {
      const connection = await db_connection;
        const [rows] = await connection.query(
            `SELECT  p.id_producto,
              p.nombre,
              p.descripcion,
              p.precio,
              p.stock,
              p.imagen as id_imagen,
              i.url,
              p.categoria as id_categoria,
              c.nombre as categoria,
              p.descuento as id_descuento,
              d.porcentaje as descuento,
              d.motivo as descuento_motivo
      FROM productos p
      JOIN productos_categorias c ON p.categoria = c.id_categoria
      JOIN productos_imagenes i ON p.imagen = i.id_imagen
      JOIN productos_descuentos d ON p.descuento = d.id_descuento`,
            [id]
        );
        return rows[0]; //Un solo producto
    } catch (error) {
        console.error("Error en getProductoId:", error);
        throw error;
    }
};

const getTodosProductosService = async () => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT  p.id_producto,
              p.nombre,
              p.descripcion,
              p.precio,
              p.stock,
              p.imagen as id_imagen,
              i.url,
              p.categoria as id_categoria,
              c.nombre as categoria,
              p.descuento as id_descuento,
              d.porcentaje as descuento,
              d.motivo as descuento_motivo
      FROM productos p
      JOIN productos_categorias c ON p.categoria = c.id_categoria
      JOIN productos_imagenes i ON p.imagen = i.id_imagen
      JOIN productos_descuentos d ON p.descuento = d.id_descuento
      `);
    const response = {
      status: 200,
      message: "Productos obtenidos correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la recoleccion de datos",
      data: error
    };
    return response
  }
}

const postProductosService = async (producto) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, stock, descuento) values
      ('${producto.nombre}', 
      '${producto.descripcion}', 
      ${producto.precio}, 
      ${producto.imagen}, 
      ${producto.categoria}, 
      ${producto.stock}, 
      ${producto.descuento});
      `)
      const response = {
      status: 201,
      message: "Producto creado correctamente",
      data: results
    }
    return response
  }
  catch {
    const response = {
      status: 400,
      message: "Fallo en la creacion del producto",
      data: error
    };
    return response
  }
}

const patchProductosService = async (producto, id_producto) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE productos SET nombre = TRIM('${producto.nombre}'), descripcion = TRIM('${producto.descripcion}'), precio = ${producto.precio}, imagen = ${producto.imagen}, categoria = ${producto.categoria}, stock = ${producto.stock}, descuento = ${producto.descuento}
      WHERE id_producto = ${id_producto};
      `)
      const response = {
      status: 200,
      message: "Producto editado correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la edicion del producto",
      data: error
    };
    return response
  }
}

const deleteProductosService = async (id_producto) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      DELETE FROM productos WHERE id_producto = ${id_producto};
      `)
    const response = {
      status: 200,
      message: "Producto eliminado correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion del producto",
      data: error
    };
    return response
  }
}


// CATEGORIAS

const getCategoriasService = async () => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT * FROM productos_categorias
      `);
    const response = {
      status: 200,
      message: "Categorias obtenidas correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la recoleccion de datos",
      data: error
    };
    return response
  }
}

const postCategoriasService = async (categoria) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO productos_categorias (nombre) values
      ('${categoria.nombre}');`)
    const response = {
      status: 201,
      message: "Categoria creada correctamente",
      data: results
    }
    return response
  }
  catch (error) {
  const response = {
      status: 400,
      message: "Fallo en la creacion de categoria",
      data: error
    };
    return response
  }
}

const patchCategoriasService = async (nombre, id_categoria) => {
  try{
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE productos_categorias SET nombre = '${nombre}' WHERE id_categoria = ${id_categoria};
      `)
    const response = {
      status: 200,
      message: "Categoria editada correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la edicion de categoria",
      data: error
    };
    return response
  }
}

const deleteCategoriasService = async (id_categoria) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      DELETE FROM productos_categorias WHERE id_categoria = ${id_categoria};
      `)
    const response = {
      status: 200,
      message: "Categoria eliminada correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion de categoria",
      data: error
    };
    return response
  }
}


//IMAGENES

const getImagenesService = async () => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`SELECT id_imagen, nombre, url FROM productos_imagenes`);
    const response = {
      status: 200,
      message: "Imagenes obtenidas correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la recoleccion de datos",
      data: error
    };
    return response
  }
}

const postImagenesService = async (imagen) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO productos_imagenes (nombre, url) values
      (TRIM('${imagen.nombre}'), TRIM('${imagen.url}'));`)
    const response = {
      status: 201,
      message: "Imagen creada correctamente",
      data: results
    }
    return response
  }
  catch (error) {
  const response = {
      status: 400,
      message: "Fallo en la creacion de imagen",
      data: error
    };
    return response
  }
}

const patchImagenesService = async (nombre, url, id_imagen) => {
  try{
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE productos_imagenes SET nombre = TRIM('${nombre}'), url = TRIM('${url}') WHERE id_imagen = ${id_imagen};
      `)
    const response = {
      status: 200,
      message: "Imagen editada correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la edicion de imagen",
      data: error
    };
    return response
  }
}

const deleteImagenesService = async (id_imagen) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      DELETE FROM productos_imagenes WHERE id_imagen = ${id_imagen};
      `)
    const response = {
      status: 200,
      message: "Imagen eliminada correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion de imagen",
      data: error
    };
    return response
  }
}

// DESCUENTOS


const getDescuentosService = async () => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`SELECT id_descuento, porcentaje, motivo FROM productos_descuentos`);
    const response = {
      status: 200,
      message: "Descuentos obtenidos correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la recoleccion de datos",
      data: error
    };
    return response
  }
}

const postDescuentosService = async (descuento) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO productos_descuentos (porcentaje, motivo) VALUES
      (${descuento.porcentaje}, TRIM('${descuento.motivo}'));`)
    const response = {
      status: 201,
      message: "Descuento creado correctamente",
      data: results
    }
    return response
  }
  catch (error) {
  const response = {
      status: 400,
      message: "Fallo en la creacion del descuento",
      data: error
    };
    return response
  }
}

const patchDescuentosService = async (porcentaje, motivo, id_descuento) => {
  try{
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE productos_descuentos SET porcentaje = ${porcentaje}, motivo = TRIM('${motivo}') WHERE id_descuento = ${id_descuento};
      `)
    const response = {
      status: 200,
      message: "Descuento editado correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la edicion del descuento",
      data: error
    };
    return response
  }
}

const deleteDescuentosService = async (id_descuento) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      DELETE FROM productos_descuentos WHERE id_descuento = ${id_descuento};
      `)
    const response = {
      status: 200,
      message: "Descuento eliminado correctamente",
      data: results
    }
    return response
  } catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion del descuento",
      data: error
    };
    return response
  }
}

module.exports = { 
  getProductoId,
  getTodosProductosService, 
  postProductosService,
  patchProductosService,
  deleteProductosService,
  //categorias
  getCategoriasService, 
  postCategoriasService, 
  patchCategoriasService, 
  deleteCategoriasService,
  //imagenes
  getImagenesService,
  postImagenesService,
  patchImagenesService,
  deleteImagenesService,
  //descuentos
  getDescuentosService,
  postDescuentosService,
  patchDescuentosService,
  deleteDescuentosService
 };