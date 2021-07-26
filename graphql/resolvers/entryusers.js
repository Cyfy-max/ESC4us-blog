const Entryuser = require('../../models/Entryuser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {SECRET_KEY}=require('../../config')

const{UserInputError} = require('apollo-server')
const {validateRegisterInput,validateLoginInput} = require('../../utils/validators')

module.exports={
    Mutation:{
        async register(_,{registerInput:{kullaniciAd,email,parola,parolaKontrol}})
        {
            //validation kontrol
            const {hatalar,valid} = validateRegisterInput(kullaniciAd,email,parola,parolaKontrol)

            if(!valid){
                throw new UserInputError('Errors',{hatalar})
            }
            // kullanıcı kontrol
            const kullanici = await Entryuser.findOne({kullaniciAd})
            if(kullanici){
                throw new UserInputError('Kullanıcı zaten kayıtlı',{
                    hatalar:{kullaniciAd:'Kullanıcı zaten kayıtlı'}
                })
            }
            parola = await bcrypt.hash(parola,12)
            const yeniKullanici = new Entryuser({
                email,
                kullaniciAd,
                parola,
                olusturulmaTarihi:new Date().toISOString()
            })
            const res = await yeniKullanici.save()
            const token = jwt.sign({
                id:res.id,
                email:res.email,
                kullaniciAd:res.kullaniciAd
            },SECRET_KEY,{expiresIn:'1h'});
            return {
                ...res._doc,
                id:res._id,
                token
            }
        },
        async login(_,{kullaniciAd,parola}){
            const {hatalar,valid} = validateLoginInput(kullaniciAd,parola);
         //Validation kontrol
            if(!valid){
                throw new UserInputError('Hatalı Islem',{hatalar})
            }
            //Kullanıcı Kontrol
            const kullanici = await Entryuser.findOne({kullaniciAd});

            if(!kullanici){
                hatalar.genel = 'Kullanıcı Bulunamadı';
                throw new UserInputError('Hatalı İşlem',{hatalar});
            }
            //Parola Kontol
            const parolaEslesme = await bcrypt.compare(parola,kullanici.parola);
            if(!parolaEslesme){
                hatalar.genel='Parola Eslesmedi';
                throw new UserInputError('Hatalı İşlem',{hatalar});
            }
            const token = jwt.sign({
                id:kullanici.id,
                email:kullanici.email,
                kullaniciAd:kullanici.kullaniciAd
            },SECRET_KEY,{expiresIn:'1h'});
            
            return{
                ...kullanici._doc,
                id:kullanici._id,
                token
            }


        }
    }
}