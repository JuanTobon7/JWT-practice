const db = require ('../database')
const bcrypt = require('bcrypt')

exports.singIn = async (req,res) => {
    try{        
        const {email,password} = req.body;
        if(!email || !password ){
            const error = new Error('Datos faltantes')
            res.status(400).send(error);
        }
        
        const query = 
        `SELECT p.*, r.name AS role_name FROM public.persons AS p 
        INNER JOIN public.roles r 
        ON p.rol_id = r.id 
        WHERE p.email = $1 ;`;
        const data = await db.query(query,[email]);

        const hashedPasword = data.password;
        if(await bcrypt.compare(password,hashedPasword)){
            const payload = {
                id: data.id,
                rol_Id: data.role_name,
                name: data.name        
            }
            return payload;
        }
    }catch(err){
        console.log('error: ',err)
    }
}