const db = require ('../database')
const bcrypt = require('bcrypt')

exports.singIn = async (email,password) => {
    try{        
                
        const query = 
        `SELECT p.*, r.name AS role_name FROM public.persons AS p 
        INNER JOIN public.roles r 
        ON p.rol_id = r.id 
        WHERE p.email = $1 ;`;
        const data = await db.query(query,[email]);        
        const hashedPasword = data.password;
        if(await bcrypt.compare(password,hashedPasword)){
            return {
                id: data.id,
                rolName: data.role_name,
                name: data.name        
            }            
        }else{
            return 'Ups contraseña incorrecta';
        }
    }catch(err){
        console.log('error: ',err)
    }
}

exports.getUser = async(id) => {    
    const query = `
    SELECT p*,r.name FROM public.persons AS p 
    INNER JOIN public.roles r
    ON p.rol_id = r.id
    WHERE p.id = $1; `;
}