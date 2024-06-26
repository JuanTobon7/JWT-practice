const db = require ('../database')
const bcrypt = require('bcrypt')

exports.singIn = async (email,password) => {
    try{                
        const query = `
            SELECT p.*, r.name AS role_name 
            FROM public.persons AS p 
            INNER JOIN public.roles r ON p.rol_id = r.id 
            WHERE p.email = $1;`;

        const result = await db.query(query,[email]);  
        if(result.rows.length === 0 ){            
            return {err: false,message:'Ups usuario no hallado'};
        }
        const data = result.rows[0];
        const hashedPasword = data.password;
        if(hashedPasword !== '$2b$10$CqEPP5EGQ.Vi5JWjx6M04uQ/Z3emkchAuIFbRak9qQ55/gnUpc4P.'){ //contraseña extraida de la BD
            console.log('en efecto hay un error')
        }
        console.log({contraseñaReal: hashedPasword})
        console.log('pasado')
        const compare = await bcrypt.compare(password,hashedPasword)
        console.log('reuslt: ',compare)
        if(compare){
            console.log('coincide')
            return {
                id: data.id,
                name: data.name,
                rolName: data.role_name
            }            
        }else{
            return  {err: false,message:'Ups contraseña incorrecta'};
        }
    }catch(err){
        console.log('error: user:',err)
    }
} 

exports.getUser = async(id,res) => {    
    try{        
        const query = `
        SELECT p.*,r.name AS role_name FROM public.persons AS p 
        INNER JOIN public.roles r
        ON p.rol_id = r.id
        WHERE p.id = $1;`;
        console.log('query getUser')
        const result = await db.query(query,[id]);
        console.log({result2: result})
        if(result.rows.length == 0){
            const err = new Error('Id equivocado');
            return {error: err};
        }
        const data = result.rows[0];
        console.log({date: data})
        return {
            id: data.id,
            name: data.name,
            rolName: data.role_name
        }        
    }catch(err){
        console.log(err)        
    }
}