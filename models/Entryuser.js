const {model,Schema} = require('mongoose');

const userSchema = new Schema({
    kullaniciAd:String,
    parola:String,
    email:String,
    olusturulmaTarihi:String
});
module.exports = model('Entryuser',userSchema) 