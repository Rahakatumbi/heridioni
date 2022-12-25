import Api from './Api'
export default{
    register(datta){return Api().post('/branche',datta)},
    branches(){return Api().get('branches')},
    findData(id){return Api().get('branche/'+id)},
}