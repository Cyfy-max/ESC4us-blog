const path = require('path')
const express = require('express')
const exphbs  = require('express-handlebars')
const Handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const expressHandlebars = require('express-handlebars');
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const moment = require('moment')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')
const cors = require('cors')
const poll = require('./routes/poll')
/////
const {ApolloServer,PubSub} = require('apollo-server')
const gql  = require('graphql-tag')
const Entrypost = require('./models/Entrypost')

const typeDefs =  require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:({req})=>({req,pubsub})
})


mongoose.connect('mongodb+srv://mberkaykaya:Cahilim07@cluster0.qfxxy.mongodb.net/esc4us?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  }).then(()=>{
    console.log('mongoDb Bağlandı');
    
  })


  app.use(expressSession({
    secret:'test',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://mberkaykaya:Cahilim07@cluster0.qfxxy.mongodb.net/esc4us?retryWrites=true&w=majority'})
  })) 

  // FLASH- MESSAGE - Middleware



app.use(fileUpload())
app.use(express.static('public'))
app.use(methodOverride('_method'))



app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers:{
    generateDate : (date,format) => {
     return moment(date).format(format)
    },
    limit :(arr,limit)=>{
      if(!Array.isArray(arr)){return []}
      return arr.slice(0,limit)
  },
   truncate:(str,len)=>{
     if(str.length > len){
       str = str.substring(0,len) +'...'
       return str
     }
   },
   paginate:(options)=>{
     let outputHtml = ''
     if(options.hash.current===1){
       outputHtml += `<li class="page-item disabled"><a class="page-link" >First</a></li>`
     }else{
      outputHtml += `<li class="page-item "><a class="page-link" href="?page1">First</a></li>`
     }

     let i = (Number(options.hash.current) > 5 ? Number(options.hash.current) - 3 : 1)

     if(i!==1){
      outputHtml += `<li class="page-item disabled"><a class="page-link" >...</a></li>`
     }
     for (; i <= (Number(options.hash.current) + 3) && i <= options.hash.pages; i++){
       if(i===options.hash.current){
        outputHtml += `<li class="page-item active"><a class="page-link" >${i}</a></li>`
       }else{
        outputHtml += `<li class="page-item "><a class="page-link" href="?page=${i}">${i}</a></li>`
       }
       if(i==Number(options.hash.current)+3 && i<options.hash.pages){
        outputHtml += `<li class="page-item disabled"><a class="page-link" >...</a></li>`
       }
     } 
     if(options.hash.current==options.hash.pages){
      outputHtml += `<li class="page-item disabled"><a class="page-link" >Last</a></li>`
     }else{
      outputHtml += `<li class="page-item "><a class="page-link" href="?page=${options.hash.pages}" >Last</a></li>`
     }

     return outputHtml
   }
}
}))
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(cors());

//DISPLAY LINK MIDDLEWARE
app.use((req,res,next)=>{
  const {userId} = req.session
  if(userId){
    res.locals = {
      displayLink:true
    }
  }else{
    res.locals = {
      displayLink:false
    }
  }
  next()
})
app.use((req,res,next)=> {
  res.locals.sessionFlash = req.session.sessionFlash
  delete  req.session.sessionFlash
  next()
})


const main = require('./routes/main')
const post = require('./routes/posts')
const users = require('./routes/users')
const admin = require('./routes/admin/index')
const contact = require('./routes/contact')

app.use('/',main)
app.use('/posts/',post)
app.use('/users/',users)
app.use('/admin/',admin)
app.use('/contact/',contact)
app.use('/poll',poll)

 



app.listen(port,hostname,()=>{
    console.log(`Server Calisiyor, http://${hostname}:${port}/`)
})