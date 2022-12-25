import Api from "./Api";

export default{
    register(data){return Api().post("/price",data)},
    last_price(id){return Api().get("/last_price/"+id)},
    all_price(){return Api().get("/prices")},
}