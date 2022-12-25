import Api from "./Api";

export default{
    register(data){return Api().post("/price",data)},
    last_price(){return Api().get("/last_price")},
    all_price(){return Api().get("/prices")},
}