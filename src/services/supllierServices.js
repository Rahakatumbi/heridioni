import Api from './Api'

export default{
    register(data){return Api().post("/supllier",data)},
    supllier(){return Api().get("/supllier")},
    saerch(id){return Api().get("/supllier/"+id)},
}