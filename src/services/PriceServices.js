import Api from "./Api";

export default{
    register(data){return Api().post("/addPrice",data)},
    last_price(){return Api().get("/last_price")},
    all_price(){return Api().get("/all_price")},
}