export default{
    //fordata的信息添加
    set(object){
        if(object==""){
            return false
        }

        let fordata=new FormData();

        for(let key in object){
            fordata.append(key,object[key]);
        }

        return fordata
    }
}