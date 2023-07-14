const {data} = require('./data/index.js')
const Koa = require('koa')
const koaCors = require("koa-cors")
const APP = new Koa()
APP.use(koaCors())
APP.use(ctx=>{
    ctx.body = data
})
APP.listen(4444)