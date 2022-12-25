import Api from './Api'
export default{
    register(data){return Api().post('/champ',data)},
    champs(){return Api().get('/champs')},
    field(id){return Api().get('/fermier/champ/'+id)},
    champ(id){return Api().get('/champ/'+id)}
}