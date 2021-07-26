const Entrypost = require('../../models/Entrypost')
const Authkontrol = require('../../utils/check-auth')

module.exports = {
    Query:{
        async getPosts(){
          try {
             const posts = await Entrypost.find().sort({olusturulmaTarihi:-1})
             return posts
          } catch (error) {
            throw new Error(error)
          }
        },
        async getPost(_,{postId}){
          try {
            const post  = await Entrypost.findById(postId)
            if(post){
              return post
            }else{
              throw new  Error('Post bulunamadı')
            }
          } catch (error) {
            throw new Error('Post bulunamadı')
          }
        }
      },
      Mutation:{
         async createPost(_,{body},context){
            const user = Authkontrol(context);
            console.log(user);

            const yeniPost = new Entrypost({
              body,
              user:user.id,
              kullaniciAd:user.kullaniciAd,
              olusturulmaTarihi:new Date().toISOString()
          });
          const post = await yeniPost.save();
          context.pubsub.publish('YENI_POST',{
            newPost:post //dikat etttttt
          })
          return post;
        },
        async deletePost(_,{postId},context){
          const user =Authkontrol(context);
          try {
              const post = await Entrypost.findById(postId);
              if(user.kullaniciAd==post.kullaniciAd){
                  await post.delete();
                  return 'Post Silindi'
              }else{
                  throw new Error('Post bulunamadı');
              }
          } catch (error) {
              throw new Error('Post bulunamadı');
          }
      },async likePost(_,{postId},context){
        const {kullaniciAd} =Authkontrol(context);
        const post = await Entrypost.findById(postId);
        if(post){
            if(post.begeniler.find(b=>b.kullaniciAd===kullaniciAd)){
                post.begeniler = post.begeniler.filter(b=>b.kullaniciAd!==kullaniciAd); 
            }else{
                post.begeniler.push({
                    kullaniciAd,
                    olusturulmaTarihi:new Date().toISOString()
                })
            }
            await post.save();
            return post;
        }else{
            throw new UserInputError('Post Bulunamadı')
        }

    }
 },Subscription:{
  newPost:{
      subscribe:(_,__,{pubsub})=>
          pubsub.asyncIterator('YENI_POST')  
  }
}
}