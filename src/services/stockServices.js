import Api from "./Api";
export default{
    saveStock(data){return Api().post('/achat',data)},
    stock(){return Api().get('/achats')},
    achatDetails(id){return Api().get("/achat/"+id)},
}