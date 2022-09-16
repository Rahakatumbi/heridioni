import Api from './Api'
export default{
    register(data){return Api().post('/champ',data)},
    champs(){return Api().get('/champ')},
    field(id){return Api().get('/champ/'+id)}
}