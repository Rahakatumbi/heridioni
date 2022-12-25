import Api from "./Api";

export default{
    register(data){return Api().post("/banque",data)},
    banque(){return Api().get("/banques")}
}