import Api from "./Api";
export default{
    saveStock(data){return Api().post('/achat',data)},
    stock(){return Api().get('/achat')},
}