/**
 * Created by lenovo on 16-8-4.
 */
var mongodb = require('./db');

function goods_info(value){
    this.name = value.name;
    this.count = value.count;
    this.price = value.price;
    this.unit = value.unit;
    this.time = value.time;
    this.date = value.date;
}

module.exports = goods_info;

goods_info.prototype.save = function(callback){
    var ware_info = {
        name : this.name,
        count : this.count,
        price : this.price,
        unit : this.unit,
        time : this.time,
        date : this.date
    };
    mongodb.close();
    mongodb.open(function(err,db){
        if(err){
            console.log(err);
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            collection.insert(ware_info,{
                    safe:true//插入的有序(true)和无序(false)
                }, function(err,user){
                db.close();
                if(err){
                    return callback(err);
                }
                callback(null,user);
            });
        });
    });
};

goods_info.replace = function(name,num,callback){
    mongodb.close();
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                db.close();
                return callback(err);
             }
            collection.update({name:name},{$set:{count:num}},function(err,user) {
             db.close();
             if (err) {
             return callback(err);
             }
             callback(null, user)
             });
        });
    });
};

goods_info.get = function(name,callback){
    //打开数据库
    mongodb.close();
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            var query = {};
            if (name) {
                query.name = name;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({
                time:-1
            }).toArray(function (err, docs) {
                db.close();
                if (err) {
                    return callback(err);//失败！返回 err
                }
                callback(null, docs);//成功！以数组形式返回查询的结果
            });
        });
    });
};

goods_info.delete = function(name,callback){
    mongodb.close();
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 users 集合
        db.collection('users', function (err, collection) {
            console.log('---------users-------------------')
            if (err) {
                db.close();
                return callback(err);//错误，返回 err 信息
            }
            collection.remove({name:name},function(err,user){
                console.log('---------shanc------------------')
                db.close();
                if (err) {
                    return callback(err);
                }
                callback(null, user)
                console.log('-------shuju-------------------')
            });

        });
    });
};