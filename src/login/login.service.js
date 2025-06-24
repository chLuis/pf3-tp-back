const { db_connection } = require("../config/database")

const loginAdminService = async (usuario, usuario_password) => {
    try {
        if (!usuario || !usuario_password) {
            throw new Error("Faltan datos para el login");
        }
        const connection = await db_connection;

        const [rows] = await connection.execute(
            `SELECT u.id_usuario, u.usuario, u.rol, r.rol AS rol_nombre, u.isBlocked
            FROM gym_usuarios u
            JOIN gym_usuarios_roles r ON u.rol = r.id_rol
            WHERE u.usuario = ? AND u.usuario_password = ?`,
            [usuario, usuario_password]
        );
        if (rows.length === 0) {
            return { success: false, message: "Nombre o usuario incorrectos, revise los campos o los permisos" }
        }

        return{ success: true, user: rows[0] };
    } catch (error) {
        console.error("Error en login.service: ", error);
        throw error;
    }
};

module.exports = { loginAdminService };