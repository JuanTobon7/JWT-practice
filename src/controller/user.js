const db = require('../database');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try{        

        const {id,rolId,name ,email, password } = req.body;

        if(!id ||!rolId || !name ||!email || !password){
            return res.status(400).send('hacen falta datos');
        }

        const queryEmail = `SELECT email FROM public.persons WHERE email = $1 ;`;
        const veryfyEmail = await db.query(queryEmail,[email]);
        
        const queryId = 'SELECT id FROM public.persons WHERE id = $1;';
        const verrifyId = await db.query(queryId,[id]);
        
        if(verrifyId.rows.length > 0) return res.status(400).send('Id ya registrado');

        if(veryfyEmail.rows.length > 0){
            return res.status(400).send('el correo ya esta en uso');
        }        

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const queryCreateUser = `INSERT INTO public.persons (id,rol_id,name,email,password) VALUES ($1,$2,$3,$4,$5) RETURNING *;`;
        await db.query(queryCreateUser,[id,rolId,name,email,hashedPassword]);        

        res.status(201).send('Usuario Creado');
    }catch(err){
        console.log('el error es: ' ,err.body);
    }
};

exports.createRol = async (req,res) => {
    const {name} = req.body;
    const query = 'INSERT INTO public.roles (name) VALUES ($1) RETURNING *;';
    try{
        await db.query(query,[name]);
        res.status(200).send('Query exitosa:');
    }
    catch(err){
        console.log(err.message)
    }
}