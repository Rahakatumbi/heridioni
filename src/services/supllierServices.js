import Api from './Api'

export default{
    register(data){return Api().post("/fermier",data)},
    supllier(){return Api().get("/fermiers")},
    saerch(data){return Api().post("search/fermier",data)},
}