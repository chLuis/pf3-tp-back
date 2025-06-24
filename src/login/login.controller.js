const { loginAdminService } = require("./login.service");

const loginAdmin = async (req, res) => {
    try {
        const  { usuario, usuario_password } = req.body;
        const result = await loginAdminService(usuario, usuario_password);
        if (!result.success) {
            return res.status(401).json({ message: result.message})
        }
        res.status(200).json({
            message: "Usuario ingresado correctamente",
            user: result.user,
        });
    } catch (error) {
        console.error("Error en login.controller: ", error);
        res.status(500).json({ message: "Error del servidor" });
    }
};

module.exports = { loginAdmin };