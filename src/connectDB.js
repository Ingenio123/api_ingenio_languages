const mongoose =  require('mongoose')
const conect_db =   async ()=>{
    try {
         mongoose.connect('mongodb://localhost:27017/ingenio_app_Lenguages',{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
            .then(db =>  console.log(`conectado con exito `))
            .catch(err =>  console.log(err))

    }catch(err){
        console.log(err)
    }
    
}  

module.exports = {
    conect_db
}