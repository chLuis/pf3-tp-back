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

module.exports = { getTodosProductosService };