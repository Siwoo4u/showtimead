
module.exports = function(conn){
    var sql = require('../query/query_shop.js');
    var express = require('express');
    var router = express.Router();
    var bodyParser = require('body-parser');
    var pagination = require('pagination');
    router.use(bodyParser.urlencoded({ extended: false }));
    router.use('/css',express.static('css'));
    router.use('/js',express.static('js'));

    //view -심사 대기 중
    router.get('/shopListWait/:page', (req,res)=>{
      var page = req.params.page;
      var total = 0;
      var s_val = req.query.search == null ? '' : req.query.search;
      var op = req.query.op == null ? '' : req.query.op;
      conn.query(sql.selectWaitShopCount(),(err,result)=>{
        if(err){
          console.log(err);
        }
        total =result.rows[0].s_count;
        var paginator = new pagination.SearchPaginator({prelink:'/main/shopListWait', current: page, rowsPerPage: 10, totalResult: total});
        conn.query(sql.selectShopListWait(op,s_val),(err,result)=>{
          if(err){
            console.log(err);
          }
          res.render('shop_wait_list',{shopList:result.rows,pagination:paginator.getPaginationData()});
        });
      });
    });

    // 타임샵 승인 하기
    router.post('/shopconfirm', (req,res)=>{

      var id = req.body.id;
      var flag = 'Y';

      conn.query(sql.updateShopConfirm(),[flag,id],(err,result)=>{
        if(err){
          console.log(err);
          res.send('err');
        }else{
          res.send(result);
        }
      });
    });

    //view - 타임샵 전체
    router.get('/shopListAll/:page', (req,res)=>{
      var page = req.params.page;
      var total = 0;
      var s_val = req.query.search == null ? '' : req.query.search;
      var op = req.query.op == null ? '' : req.query.op;
      conn.query(sql.selectAllShopCount(),(err,result)=>{
        if(err){
          console.log(err);
        }
        total =result.rows[0].s_count;
        var paginator = new pagination.SearchPaginator({prelink:'/main/shopListWait', current: page, rowsPerPage: 10, totalResult: total});
        conn.query(sql.selectShopListAll(op,s_val),(err,result)=>{
          if(err){
            console.log(err);
          }
          res.render('shop_all_list',{shopList:result.rows,pagination:paginator.getPaginationData()});

        });
      });
    });

    //view - 회원리스트
    router.get('/userList/:page', (req,res)=>{
      var page = req.params.page;
      console.log('page->'+page);
      var total=0;
      var list = 10;
      var offset = (page -1) * 10;
      var s_name = req.query.search == null ? '' : req.query.search;
      var op = req.query.op == null ? '' : req.query.op;

      console.log('sss-'+s_name);
      console.log('offset->'+offset);
      conn.query(sql.selectUserCount(),(err,result)=>{
        if(err){
          console.log(err);
        }
        total =result.rows[0].u_count;
        var paginator = new pagination.SearchPaginator({prelink:'/main/userList', current: page, rowsPerPage: 10, totalResult: total});


        conn.query(sql.selectUserList(op,s_name),[offset],(err,result)=>{
          if(err){
            console.log(err);
          }
          res.render('userList',{userList:result.rows,pagination:paginator.getPaginationData()});
        });
      });
    });

    router.get('/userView/:id',(req,res)=>{
      console.log('===============>'+req.params.id);
      conn.query(sql.selectUserView(),[req.params.id],(err,result)=>{
        if(err){
          console.log(err);
        }
        var u_data = result.rows[0];

        conn.query(sql.selectOrder(),[u_data.u_idx],(err,result)=>{
            if(err){
              console.log(err);
            }
            var dt = new Date();
            var year = dt.getFullYear();
            res.render('userView',{data:u_data,order:result.rows,year:year});
        });



      });

    });

    return router;
}
