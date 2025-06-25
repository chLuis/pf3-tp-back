const { productosRelacionados, getProductoId, getTodosProductosService, getCategoriasService, postCategoriasService, patchCategoriasService, deleteCategoriasService, getImagenesService, postImagenesService, patchImagenesService, deleteImagenesService, getDescuentosService, postDescuentosService, patchDescuentosService, deleteDescuentosService, postProductosService, patchProductosService, deleteProductosService } = require("./productos.service");

const productosRelacionadosController = async (req, res) => {
  try {
    const { id_categoria } = req.params
    const productos = await productosRelacionados(id_categoria)

    res.status(200).json(productos)
  } catch (error) {
    console.error("Error al obtener productos relacionados:", error)
    res.status(500).json({ message: "Error interno"} )
  }
}

const controllerGetProductoId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await getProductoId(id);

        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado"});
        }

        res.status(200).json(producto);
    } catch (error) {
        console.error("Erro en controllerGetProductoId:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


const getTodosProductosController = async (req, res) => {
  try {
    const response = await getTodosProductosService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error, "_____");
    return res.status(400).json(error);
  }
}

const postProductosController = async (req, res) => {
  const producto = req.body;
  try {
    const response = await postProductosService(producto)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const patchProductosController = async (req, res) => {
  const producto = req.body;
  const id_producto = req.params.id_producto
  try {
    const response = await patchProductosService(producto, id_producto)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const deleteProductosController = async (req, res) => {
  const id_producto = req.params.id_producto;
  try {
    const response = await deleteProductosService(id_producto)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}




// CATEGORIAS ------------------------------------------------------

const getCategoriasController = async (req, res) => {
  try {
    const response = await getCategoriasService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const postCategoriasController = async (req, res) => {
  const categoria = req.body;
  try {
    const response = await postCategoriasService(categoria)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const patchCategoriasController = async (req, res) => {
  const {nombre} = req.body;
  const id_categoria = req.params.id_categoria;
  try {
    const response = await patchCategoriasService(nombre, id_categoria)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const deleteCategoriasController = async (req, res) => {
  const id_categoria = req.params.id_categoria;
  try {
    const response = await deleteCategoriasService(id_categoria)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


// IMAGENES ------------------------------------------------------

const getImagenesController = async (req, res) => {
  try {
    const response = await getImagenesService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data 
    })
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


const postImagenesController = async (req, res) => {
  const imagen = req.body;
  try {
    const response = await postImagenesService(imagen)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const patchImagenesController = async (req, res) => {
  const {nombre, url} = req.body;
  const id_imagen = req.params.id_imagen;
  try {
    const response = await patchImagenesService(nombre, url, id_imagen)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const deleteImagenesController = async (req, res) => {
  const id_imagen = req.params.id_imagen;
  try {
    const response = await deleteImagenesService(id_imagen)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


// DESCUENTOS ------------------------------------------------------
 
const getDescuentosController = async (req, res) => {
  try {
    const response = await getDescuentosService()
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data 
    })
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const postDescuentosController = async (req, res) => {
  const descuento = req.body;
  try {
    const response = await postDescuentosService(descuento)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const patchDescuentosController = async (req, res) => {
  const {porcentaje, motivo} = req.body;
  const id_descuento = req.params.id_descuento;
  try {
    const response = await patchDescuentosService(porcentaje, motivo, id_descuento)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}

const deleteDescuentosController = async (req, res) => {
  const id_descuento = req.params.id_descuento;
  try {
    const response = await deleteDescuentosService(id_descuento)
    return res.json({
      status: response.status,
      message: response.message,
      data: response.data});
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}


module.exports = {
  productosRelacionadosController,
  controllerGetProductoId,
  getTodosProductosController, 
  postProductosController,
  patchProductosController,
  deleteProductosController,
  //categorias
  getCategoriasController, 
  postCategoriasController, 
  patchCategoriasController, 
  deleteCategoriasController,
  //imagenes
  getImagenesController,
  postImagenesController,
  patchImagenesController,
  deleteImagenesController,
  //descuentos
  getDescuentosController,
  postDescuentosController,
  patchDescuentosController,
  deleteDescuentosController
 };