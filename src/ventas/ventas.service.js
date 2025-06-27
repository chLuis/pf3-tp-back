const { db_connection } = require("../config/database");

const getTodasVentasService = async (socio) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT v.id_venta, v.id_producto, p.nombre, v.cantidad, v.monto, u.usuario, v.createdAt as fecha_venta
      FROM productos_ventas v
      JOIN gym_usuarios u ON v.id_usuario = u.id_usuario
      JOIN productos p ON v.id_producto = p.id_producto;
      ;`);

    const response = {
      status: 200,
      message: "Ventas recolectadas",
      data: results
    }
    return response
  }
  catch (error) {
    console.log(error);
    const response = {
      status: 400,
      message: "Fallo en la recoleccion de datos",
      data: error
    };
    return response
  }
}

const postVentasService = async (venta) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO productos_ventas (id_producto, id_usuario, cantidad, monto) VALUES
      (${venta.id_producto}, '${venta.id_usuario}', ${venta.cantidad}, ${venta.monto});`)
      const response = {
      status: 201,
      message: "Venta creada correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la creacion de la venta",
      data: error
    };
    return response
  }
}

const patchVentasService = async (venta, id_venta) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE productos_ventas 
      SET id_producto = ${venta.id_producto}, id_usuario = '${venta.id_usuario}', cantidad = ${venta.cantidad}, monto = ${venta.monto}
      WHERE id_venta = ${id_venta};
      ;`)
      const response = {
      status: 200,
      message: "Venta editada correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la creacion de la venta",
      data: error
    };
    return response
  }
}

const deleteVentasService = async (id_venta) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`DELETE from productos_ventas WHERE id_venta = ${id_venta};`)
      const response = {
      status: 200,
      message: "Venta eliminada correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion de la venta",
      data: error
    };
    return response
  }
}

module.exports = { getTodasVentasService, postVentasService, patchVentasService, deleteVentasService };