const Entrypost = require('../../models/Entrypost')
const checkAuth = require('../../utils/check-auth')
const {UserInputError} = require('apollo-server');
module.exports={
    Mutation:{
        createComment:async(_,{postId,body},context)=>{
            const user = checkAuth(context);

            if(body.trim()===''){
                throw new UserInputError('Yorum Bos Gecilemez',{hatalar:{body:'Yorum bos gecilemez'}})
            }
            const post = await Entrypost.findById(postId);
            if(post){
                 post.yorumlar.unshift({
                     body,
                     kullaniciAd:user.kullaniciAd,
                     olusturulmaTarihi:new Date().toISOString() 
                 })
                 await post.save();
                 return post;
            }else{
                 throw new UserInputError('Post Bulunamadı')
            }
        },
        deleteComment:async(_,{postId,commentId},context)=>{
            const {kullaniciAd} = checkAuth(context);
            const post=await Entrypost.findById(postId);
            if(post){
                const commentIndex=post.yorumlar.findIndex(c=>c.id==commentId);

                if(post.yorumlar[commentIndex].kullaniciAd===kullaniciAd){
                    post.yorumlar.splice(commentIndex);
                    await post.save();
                    return post;
                }else{
                    throw new AuthenticationError('Yorum silmeye yetkiniz bulunmuyor')
                }
            }else{
                throw new UserInputError('Post Bulunamadı')
            }
           }
    }
}