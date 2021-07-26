const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const path = require('path')

router.get('/',(req,res)=>{
    console.log(req.session)
    res.render('site/index')
})
router.get('/survey',(req,res)=>{
    console.log(req.session)
    res.sendFile(path.resolve(__dirname,'../public/survey.html'))
})
router.get('/travel',(req,res)=>{
    console.log(req.session)
    res.sendFile(path.resolve(__dirname,'../public/travel.html'))
})
router.get('/quiz',(req,res)=>{
    console.log(req.session)
    res.render('site/deneme')
})
router.get('/blog',(req,res)=>{
    
    const postPerPage = 4
    const page = req.query.page || 1
    
    
    Post.find({}).populate({path:'author',model:User}).sort({$natural:-1})
        .skip((postPerPage * page)-postPerPage)
        .limit(postPerPage)
        .then(posts=>{
            Post.countDocuments().then(postsCount => {
                Category.aggregate([
                    {
                        $lookup:{
                            from:'posts',
                            localField:'_id',
                            foreignField:'category',
                            as:'posts'
                        }     
                    },
                    {
                        $project:{
                            _id:1,
                            name:1,
                            num_of_posts:{$size:{ "$ifNull": [ "$posts", [] ] }}
                        }
                    }
                ]).then(categories => {
                      res.render('site/blog',{posts:posts,categories:categories,current:parseInt(page),pages:Math.ceil(postsCount/postPerPage)})
                }) 
            })
      
    })
})
router.get('/contact',(req,res)=>{
    res.render('site/contact')
})
router.get('/about',(req,res)=>{
    res.render('site/about')
})

/* router.get('/admin',(req,res)=>{
    res.render('admin/index')
})
 */
module.exports = router