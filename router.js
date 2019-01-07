var express = require('express')
    md5 = require('blueimp-md5')
    User = require('./models/user')
    Comment = require('./models/comment')

var router = express.Router()

router.get('/',(req, res)=>{
    Comment.find({classification: 'Node'}, (err, ret)=>{
        if(err){
            res.render('500.html')
        }
        res.render('index.html',{
            user: req.session.user,
            comment: ret
        })
    })
})

router.get('/login',(req, res)=>{
    res.render('login.html')
})

router.post('/login',(req, res)=>{
    // 接受表单数据
    var body = req.body
    // 查询数据是否在数据库中
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    }, (err, user)=>{
        if(err){
            // 服务器错误
            res.status(500).json({statusCode: 1 })
        }
        if(!user){
            // 用户不存在
            res.status(200).json({statusCode: 2 })
        }else{
            // 写入 session
            req.session.user = user
            // 用户存在
            res.status(200).json({statusCode: 0 })
        }
    })
})

router.get('/register',(req, res)=>{
    res.render('register.html')
})

router.post('/register',(req, res)=>{
    // 获取提交数据
    var body = req.body
    // 判断账号是否已存在
    User.findOne({email: body.email}, (err, user)=>{
        if (err){
            res.status(500).json({statusCode: 1 })
        }
        if(user){
            // 邮箱已被注册
            res.status(200).json({statusCode: 2 })
        }else{
            User.findOne({username: body.username},(err, user)=>{
                if (err){
                    // 昵称已被占用
                    res.status(500).json({statusCode: 3 })
                }
                else{
                    // 用户不存在，创建用户
                    body.password = md5(md5(body.password))
                    new User(body).save(err => {
                        if (err) {
                            res.status(500).json({
                                statusCode: 1
                            })
                        }
                    })
                    res.status(200).json({
                        statusCode: 0
                    })
                }
            })
        }
    })
})

router.get('/layout', (req, res)=>{
    req.session.user = null
    res.redirect('/login')
})

router.get('/topics/new', (req, res)=>{
    if (req.session.user){
        res.render('topics/new.html',{
            user: req.session.user
        })
    }else{
        res.redirect('/login')
    }
})

router.post('/topics/new', (req, res)=>{
    var body = req.body
    console.log(body)
    new Comment(body).save(err=>{
        res.render('500.html')
    })
    res.redirect('/')
})

router.get('/topics/show',(req, res)=>{
    var title = req.query.title
    Comment.findOne({title: title},(err, data)=>{
        if(err){
            res.render('500.html')
        }
        res.render('topics/show.html',{
            comment: data
        })
    })
    
})

module.exports = router