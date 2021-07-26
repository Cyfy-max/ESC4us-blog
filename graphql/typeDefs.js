const {gql} = require('apollo-server')

module.exports =gql`
type Yorum{
  id:ID!,
  kullaniciAd:String!,
  olusturulmaTarihi:String!,
  body:String!
},
type Begeni{
  id:ID!,
  olusturulmaTarihi:String!,
  kullaniciAd:String!
},
type Entrypost{
  id:ID!,
  body:String!,
  olusturulmaTarihi:String!,
  kullaniciAd:String!,
  yorumlar:[Yorum]!
  begeniler:[Begeni],
  yorumSayisi:Int!,
  begeniSayisi:Int!
},
type Entryuser{
  id:ID!,
  email:String!,
  parola:String!,
  token:String!,
  olusturulmaTarihi:String!,
  kullaniciAd:String!
},
input RegisterInput{
  kullaniciAd:String!
  parola:String!,
  parolaKontrol:String!,
  email:String!
},
type Query{
    getPosts:[Entrypost],
    getPost(postId:ID!):Entrypost
  },
type Mutation{
  register(registerInput:RegisterInput):Entryuser!
  login(kullaniciAd:String!,parola:String!):Entryuser!
  createPost(body:String):Entrypost!
  deletePost(postId:ID!):String!,
  createComment(postId:String!,body:String!):Entrypost!
  deleteComment(postId:ID!,commentId:ID!):Entrypost!
  likePost(postId:ID!):Entrypost!
},
type Subscription{
  newPost:Entrypost!
}
`; 