const expres = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const path= require("path");

const app = expres();
var imgs;
app.use(expres.static(__dirname+"/uploads"));
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename:function(req,file,cb){
            cb(null,file.fieldname + "_" + Date.now() + ".jpg")
            imgs=file.fieldname + "_" + Date.now() + ".jpg";
        }
    })

}).single("user-file");

app.post("/upload",upload,(req,resp)=>{
    main();
    const puplicpath = path.join(__dirname,'uploads');
    resp.send(puplicpath+"\\"+imgs)
})

const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/mideya");
    const userShema = new mongoose.Schema({
        name: String,
        email: String,
        img:String
    })
    const userModel = mongoose.model('users',userShema);
    const puplicpath = path.join(__dirname,'uploads');
    // console.log(puplicpath);
    let data = new userModel({name:"ram",email:"ram@gmail.com",img:puplicpath+"\\"+imgs});
    let result = await data.save();
    console.log(result);
}
app.listen(5000,()=>{
    console.log(`server started on port 3000`);
});