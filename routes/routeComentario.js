import  Express  from "express";
const comentarios = Express();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );
import { postComentarios , getComentarios,
     deleteComentarios, putComentarios } from "../controllers/controllerComentario.js";
     

comentarios.post ('', upload.single('imagen'), postComentarios)

comentarios.get ('' , getComentarios);

comentarios.delete ('/:id' , deleteComentarios);

comentarios.put ('/:id' , putComentarios);

export {comentarios}