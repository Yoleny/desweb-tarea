import { db } from "../db/conn.js";

const putComentarios = async (req, res)=>{

    try{

        const {id} = req.params;
        const {comen} = req.body;
        const params =[comen, id];

        const sql = ` update tbl_comentarios 
                    set caption = $1
                    where id = $2 returning id, 'Actualizacion Exitosa' mensaje `;
    
        const result = await db.query(sql , params);
        
        res.json(result);

    }catch(err){
        res.status(500).json({mensaje: err.message})
    }

}

const postComentarios = async (req, res) => {

    try {

        const {
            comen,
            nombre_usuario
        } = req.body;

        const {
            buffer,
            mimetype,
            originalname
        } = req.file;

        const params = [buffer, mimetype, originalname, comen, nombre_usuario];

        const sql = ` insert into tbl_comentarios
                        (imagen, mime_type, nombre_archivo, comen, nombre_usuario  )
                        values 
                        ($1, $2, $3, $4, $5)
                      returning  id, nombre_usuario, 'Insercion Exitosa' mensaje `;

        const result = await (db.query(sql, params));


        res.json(result)

    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }



}

const deleteComentarios = async (req, res) => {

    try {
        const params = [req.params.id];

        const sql = `update tbl_comentarios
                    set activo = false 
                where id = $1 
                returning id, 'Comentario Borrado' mensaje `;

        const result = await db.query(sql, params);

        res.json(result);

    } catch (err) {
        
        res.status(500).json({mensaje : err.message})

    }


}

const getComentarios = async (req, res) => {

    try {

        const sql = `SELECT * FROM tbl_comentario 
                     WHERE id_publicacion = $1 AND activo = true ORDER BY fecha_comentario DESC`

        const result = await db.query(sql);

        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ mensaje: "Sin datos que mostrar" });
        }



    } catch (err) {

        res.status(500).json({ mensaje: "Error en busqueda de post" });

    }


}


export {
    postComentarios,
    getComentarios,
    deleteComentarios, 
    putComentarios
}