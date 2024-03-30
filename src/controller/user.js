const {db} = require('../database');

exports.register = async(req,res)=>{
    const {email,password} = req.body;
    const query = `INSERT INTO public.roles VALUES (${email}, ${password} RETURNING * `
    try {
        const res = await db.query(query, [email, password]);
        console.log(res.rows[0]);
    } catch (err) {
        console.error(err.stack);
    }
};