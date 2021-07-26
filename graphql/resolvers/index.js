const entrypostResolvers = require('./entryposts')
const entryuserResolvers = require('./entryusers')
const commentResolvers = require('./comments')

module.exports={
    Entrypost:{
        begeniSayisi(parent){
            console.log(parent); 
            return parent.begeniler.length;
         },
         yorumSayisi:(parent)=>parent.yorumlar.length
    },
    Query:{
        ...entrypostResolvers.Query
    },
    Mutation:{
        ...entryuserResolvers.Mutation,
        ...entrypostResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription:{
        ...entrypostResolvers.Subscription
    }
}