var express = require('express');
var router = express.Router();
var _ = require('lodash');
var add_goods = require('../models/add_goods.js');

/* GET home page. */


router.get('/', function(req, res, next) {
  add_goods.get(null,function(err,add_goods){
    if(err){
      add_goods = [];
    }
    res.render('index', {
      title : 'Express',
      add_goods : add_goods,
      user : req.session.add_goods
    });
  });
});


/*router.post('/',function(req,res){//通过<form>的提交按钮进行
  var value=req.body;
  console.log(value);
  var name=Object.keys(value)[0];
  var count = eval('value.'+name);
  add_goods.replace(name,count,function(err,add_goods){
    if(err){
      req.flash('error',err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});*/

router.get('/add_goods',function(req,res,next){
  res.render('add_goods',{title:'add_goods'});
});

router.post('/add_goods',function(req,res){
  var ware_info=new add_goods({
    name : req.body.goods_name,
    count : req.body.goods_number,
    price : req.body.goods_price,
    unit : req.body.goods_unit,
    time : time(),
    date : get_now_date()
  });
  ware_info.save(function(err,user){
    if(err){
      req.flash('error',err);
      return res.redirect('/add_goods');
    }
    req.session.user = user;
    res.redirect('/add_goods');
  });
});

router.get('/delete',function(req,res){//ajax执行
  add_goods.delete(req.query.name,function(err,add_goods){
    if(err){
      req.flash('error',err);
      return res.redirect('/');
    }
    res.end();
  });
});

router.post('/update',function(req,res){
  add_goods.replace(req.body.name,req.body.count,function(err,add_goods){
    if(err){
      req.flash('error',err);
      return res.redirect('/');
    }
    res.end();
  });
})

function time(){
  var time = new Date();
  return time.getTime();
}

function get_now_date(){
  var now_date = new Date();
  var year = now_date.getFullYear();
  var month=now_date.getMonth()+1>9 ? now_date.getMonth()+1 : '0'+(now_date.getMonth()+1);
  var data=now_date.getDate()>=10 ? now_date.getDate() : '0'+now_date.getDate();
  var date=year+'-'+month+'-'+data;
  return date;
}

module.exports = router;
