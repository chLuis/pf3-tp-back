const { db_connection } = require("../config/database");

const getUsuariosService = async (socio) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT u.id_usuario, u.usuario, u.rol as id_rol, r.rol, u.isBlocked
      FROM gym_usuarios u
      JOIN gym_usuarios_roles r ON u.rol = r.id_rol
      WHERE r.rol <> 'superadmin'
      ;`);
      
    const response = {
      status: 200,
      message: "Usuarios recolectados",
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

const postUsuariosService = async (usuario) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO gym_usuarios (id_usuario, usuario, usuario_password, rol) VALUES
      (UUID(), '${usuario.usuario}', '${usuario.usuario_password}', ${usuario.id_rol});`)
      const response = {
      status: 201,
      message: "Usuario creado correctamente",
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

const patchUsuariosService = async (usuario) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      UPDATE gym_usuarios 
      SET usuario = '${usuario.usuario}', rol = ${usuario.id_rol}
      WHERE id_usuario = '${usuario.id_usuario}';
      ;`)
      const response = {
      status: 200,
      message: "Usuario editado correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la creacion del usuario",
      data: error
    };
    return response
  }
}

const deleteUsuariosService = async (id_usuario) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`DELETE from gym_usuarios WHERE id_usuario = '${id_usuario}';`)
      const response = {
      status: 200,
      message: "Usuario eliminado correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion del usuario",
      data: error
    };
    return response
  }
}

const resetPasswordUsuariosService = async (id_usuario) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`UPDATE gym_usuarios SET usuario_password = usuario WHERE id_usuario = '${id_usuario}';`)
      const response = {
      status: 200,
      message: "Contraseña reseteada con exito, ahora su contraseña es el mismo nombre del usuario",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en el reset de password",
      data: error
    };
    return response
  }
}

const blockUnblockUsuariosService = async (id_usuario) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`CALL block_unblock('${id_usuario}');`)
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

module.exports = { getUsuariosService, postUsuariosService, patchUsuariosService, deleteUsuariosService, resetPasswordUsuariosService, blockUnblockUsuariosService };