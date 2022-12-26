import Api from "./Api";

export default{
    register(data){return Api().post("/client",data)},
    clients(){return Api().get("/clients")},
    client(id){return Api().get("/client/"+id)}
}