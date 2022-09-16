import Api from "./Api";

export default{
    register(data){return Api().post("/client",data)},
    client(){return Api().get("/client")}
}