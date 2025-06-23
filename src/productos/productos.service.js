const { db_connection } = require("../config/database");

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




// CATEGORIAS

const getCategoriasService = async () => {{
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
}}

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

module.exports = { getTodosProductosService, getCategoriasService, postCategoriasService, patchCategoriasService, deleteCategoriasService,
  getImagenesService,
  postImagenesService,
  patchImagenesService,
  deleteImagenesService
 };