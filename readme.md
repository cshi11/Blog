# Blog 案例
## 学习参考
Node.js - 黑马程序员

[B 站视频](https://www.bilibili.com/video/av27670326?p=110)

## 需求整理
- 注册用户、登陆、登出
- 发表文章
- 查看文章

## 使用技术
- Express
- Bootstrap
- Art-template
- Mongoose
- ……

## 路由设计

| 路径         | 方法 | get 参数 | POST参数                | 备注         |      |
| ------------ | ---- | -------- | ----------------------- | ------------ | ---- |
| /            | GET  |          |                         | 渲染首页     |      |
| /register    | GET  |          |                         | 渲染注册页   |      |
| /register    | POST |          | Email,nickname,password | 处理注册请求 |      |
| /login       | GET  |          |                         | 渲染登陆页面 |      |
| /login       | POST |          | Email， Password        | 处理登陆请求 |      |
| /topics/new  | GET  |          |                         | 渲染发贴页面 |      |
| /topics/new  | POST |          |                         | 处理发帖请求 |      |
| /topics/show | GET  | Title    |                         | 渲染帖子内容 |      |

## 接口设计
- 登陆
  - 状态码 statusCode
    - 0 --- 用户存在，登陆成功
    - 1 — 数据库错误
    - 2 — 用户不存在，账号或者密码错误
- 注册
  - 状态码
    - 0 -- 创建用户成功
    - 1 — 数据库错误
    - 2 -- 邮箱已经存在
    - 3 -- 昵称已存在

