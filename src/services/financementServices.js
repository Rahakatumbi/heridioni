import Api from "./Api";

export default{
    register(data){return Api().post("/financement",data)},
    financements(){return Api().get("/financements")},
    financement(id){return Api().get("/financement/"+id)},
    depense(data){return Api().post('/depense',data)},
    depenses(){return Api().get('/depense')},
    document(data){return Api().post('/document',data)},
    documents(){return Api().get('/document')},
}