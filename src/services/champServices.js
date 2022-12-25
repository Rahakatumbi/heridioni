import Api from './Api'
export default{
    register(data){return Api().post('/champ',data)},
    champs(){return Api().get('/champs')},
    field(id){return Api().get('/fermier/champ/'+id)},
    supplierId(id){return Api().get('/champ/supplier/'+id)},
    champ(id){return Api().get('/champ/'+id)}
}