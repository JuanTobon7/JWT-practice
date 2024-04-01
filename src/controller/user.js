const db = require('../database');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    if(await bcrypt.compare(password,hashedPassword)){
        console.log('contraseñas coinciden');
    }else{
        console.log('nanana');
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