module.exports.validateRegisterInput=(
    kullaniciAd,
    email,
    parola,
    parolaKontrol
)=>{
    const hatalar={};

    if(kullaniciAd.trim()===''){
        hatalar.kullaniciAd='Kullanici Ad bos gecilemez'
    }
    if(email.trim()===''){
        hatalar.email='Email Ad bos gecilemez'
    }
    if(parola.trim()===''){
        hatalar.parola='Parola bos gecilemez'
    }else if(parola!=parolaKontrol){
        hatalar.parolaKontrol='Parola ile Parola tekrarı aynı olmalı'
    }
    return{
        hatalar,
        valid:Object.keys(hatalar).length < 1
    }
}

module.exports.validateLoginInput=(kullaniciAd,parola)=>{
   
    const hatalar ={};
    
    if(kullaniciAd.trim()===''){
        hatalar.kullaniciAd='Kullanici Ad bos gecilemez'
    } 
    if(parola.trim()===''){
        hatalar.parola='Parola bos gecilemez'
    }
    return{
        hatalar,
        valid:Object.keys(hatalar).length < 1
    }
}