const { getTodosProductosService, getCategoriasService, postCategoriasService, patchCategoriasService, deleteCategoriasService, getImagenesService, postImagenesService, patchImagenesService, deleteImagenesService, getDescuentosService, postDescuentosService, patchDescuentosService, deleteDescuentosService } = require("./productos.service");

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
  getTodosProductosController, 
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