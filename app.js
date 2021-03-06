// 加载express模块
var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParse = require('body-parser');
// 创建APP应用
var app = express();
// 设置静态文件托管
app.use('/public', express.static(__dirname + '/public'));

// 设置模板引擎
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
// 在开发过程中需要取消模板缓存
swig.setDefaults({cache: false});

app.use(bodyParse.urlencoded({extended: true}))

// 根据不同的功能划分不同的模块
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27017/blog', function (err) {
  if(err){
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
  }
});
app.listen(8888);