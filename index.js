import  Express  from "express";
const app = Express();
import { usuario } from "./routes/routeUser.js";
import { publicacion } from "./routes/routePublicacion.js";
import { comentarios } from "./routes/routeComentario.js";
import { usuarioCrud } from "./routes/routeUserCRUD.js";
import cors from 'cors';


// Middleware 
app.use(Express.json());
const corsOptions = {
    origin : 'http://localhost:5173', 
    credentials : true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
// Rutas
app.use('/api/usuario', usuario);
app.use('/api/publicacion', publicacion);
app.use('/api/comentarios', comentarios);
app.use('/api/usuarioCrud', usuarioCrud);


//Puerto
app.listen(4000, ()=>{

    console.log("Esuchando en el puerto 4000");

});