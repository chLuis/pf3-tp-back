const { db_connection } = require("../config/database");

const getTodosSociosService = async () => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT  s.id_socio,
              s.nombre,
              s.apellido,
              s.dni,
              SUBSTRING(s.socio_desde, 1, 10) as socio_desde,
              SUBSTRING(s.socio_hasta, 1, 10) as socio_hasta,
              p.id_plan,
              p.nombre_plan
      FROM gym_socios s
      JOIN gym_planes p ON s.id_plan = p.id_plan
      `);
    const response = {
      status: 200,
      message: "Socios obtenidos correctamente",
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

const getOneSociosService = async (dni) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      SELECT  s.id_socio,
              s.nombre,
              s.apellido,
              SUBSTRING(s.socio_desde, 1, 10) as socio_desde,
              SUBSTRING(s.socio_hasta, 1, 10) as socio_hasta,
              p.nombre_plan
      FROM gym_socios s
      JOIN gym_planes p ON s.id_plan = p.id_plan
      WHERE s.dni = ${dni}
      `);
    const response = {
      status: 200,
      message: "Socio obtenido correctamente",
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

const postNuevoSociosService = async (socio) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`
      INSERT INTO gym_socios (nombre, apellido, dni, socio_hasta, id_plan) VALUES 
      (TRIM('${socio.nombre}'), TRIM('${socio.apellido}'), '${socio.dni}', '${socio.socio_hasta}', ${socio.id_plan})`);
    const response = {
      status: 201,
      message: "Socio creado correctamente",
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

const patchSociosService = async (socio) => {
  try {
    const connection = await db_connection;

    const [results] = await connection.query(`
      UPDATE gym_socios SET
        nombre=TRIM('${socio.nombre}'), 
        apellido=TRIM('${socio.apellido}'), 
        dni='${socio.dni}', 
        socio_hasta='${socio.socio_hasta}', 
        id_plan=${socio.id_plan}
      WHERE id_socio=${socio.id_socio}`);
      console.log(results, "RESULTS");
    const response = {
      status: 200,
      message: "Socio editado correctamente",
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

const deleteSociosService = async (id_socio) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`DELETE FROM gym_socios WHERE id_socio = ${id_socio}`);
    const response = {
      status: 200,
      message: "Socio eliminado correctamente",
      data: results
    }
    return response
  }
  catch (error) {
    const response = {
      status: 400,
      message: "Fallo en la eliminacion del socio",
      data: error
    };
    return response
  }
}


const postAgregarTiempoSociosService = async (id_socio, cantidad) => {
  try {
    const connection = await db_connection;
    const [results] = await connection.query(`CALL renovar_socio(${id_socio}, ${cantidad})`);
    if(results.affectedRows === 0) 
      return {status: 400, message: "No se pudo agregar el tiempo", data: results}
    return {status: 200, message: "Tiempo agregado correctamente", data: results}
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



module.exports = { getTodosSociosService, getOneSociosService, postAgregarTiempoSociosService, postNuevoSociosService, patchSociosService, deleteSociosService };
