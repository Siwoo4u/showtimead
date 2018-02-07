module.exports = {
  selectWaitShopCount:()=>{
    return "select count(A.shop_id)s_count "+
            "FROM tm_shopinfo A, tm_users B ,tm_document C "+
            "WHERE A.u_email = B.u_email "+
            "AND A.shop_id = C.shop_id AND shop_confirm = 'N' ";
  },
  selectShopListWait: function (op,s_val) {
    var where ="WHERE A.u_email = B.u_email "+
                "AND A.shop_id = C.shop_id AND shop_confirm = 'N' ";
    if(op=='shop'){
        where = where + "AND shop_name like '%"+s_val+"%' ";
    }else if (op=='name'){
        where = where + "AND u_name like '%"+s_val+"%' ";
    }

    var query =  "SELECT  (ROW_NUMBER() OVER())-1 AS ROWNUM,A.shop_id,shop_name,u_tel,shop_confirm,shop_payment,u_name,d_file,TO_CHAR(shop_date,'YYYY-MM-DD')s_date "+
            "FROM tm_shopinfo A, tm_users B ,tm_document C "+
            where +
            "ORDER by shop_date desc";
    console.log(query);
    return query;
  },
  selectAllShopCount:()=>{
    return "select count(A.shop_id)s_count "+
            "FROM tm_shopinfo A, tm_users B ,tm_document C "+
            "WHERE A.u_email = B.u_email "+
            "AND A.shop_id = C.shop_id ";
  },
  selectShopListAll: function (op,s_val) {
    var where ="WHERE A.u_email = B.u_email "+
                "AND A.shop_id = C.shop_id ";
    if(op=='shop'){
        where = where + "AND shop_name like '%"+s_val+"%' ";
    }else if (op=='name'){
        where = where + "AND u_name like '%"+s_val+"%' ";
    }

    var query =  "SELECT  (ROW_NUMBER() OVER())-1 AS ROWNUM,A.shop_id,shop_name,u_tel,shop_confirm,shop_payment,u_name,d_file,TO_CHAR(shop_date,'YYYY-MM-DD')s_date "+
            "FROM tm_shopinfo A, tm_users B ,tm_document C "+
            where +
            "ORDER by shop_date desc";
    console.log(query);
    return query;
  },
  updateShopConfirm: function(){
    return 'UPDATE tm_shopinfo SET shop_confirm= $1 WHERE shop_id = $2 ';
  },
  selectUserList: function(op,s_name){
    console.log("op:-----------"+op);
    var where ="";
    if(op == 'name'){
      where = "where u_name like '%"+s_name+"%' ";
    }else if(op=='email'){
      where = "where u_email like '%"+s_name+"%' ";
    }else{
      where ="";
    }

    var query =  "select u_idx,u_email,u_name,u_tel_cp, u_tel,u_tel_confirm,u_sns_type,"+
            "to_char(u_insert_dt,'YYYY-MM-DD')u_insert_dt,u_maketing,u_sex,u_birth from tm_users "+
            where+
            "LIMIT 10 OFFSET $1";
    console.log("QUERY:"+query);
    return query;
  },
  selectUserCount:()=>{
    return "select count(u_email)u_count from tm_users";
  },
  selectUserView:()=>{
    var query = "select * from tm_users where u_idx= $1";
    console.log("QUERY:"+query);
    return query;
  },
  selectOrder:()=>{
    var query = "select o_id, to_char(o_date,'YYYY-MM-DD HH24시MM분')o_date, to_char(o_time,'YYYY-MM-DD HH24시MM분')o_time, m_name,o_count, o_pay, o_type,shop_name "+
                "from tm_order A,tm_shopinfo B "+
                "where A.shop_id = B.shop_id and u_idx = $1 "+
                "order by o_date desc";
    console.log("QUERY:"+query);
    return query;
  }
};
