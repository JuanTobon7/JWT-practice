const app = require('./src/app')
app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
  });
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  try{
    console.log(`Server is running on http://localhost:${PORT}`);
  }catch(error){
    console.log('el error es: ' , error);
  }
});
