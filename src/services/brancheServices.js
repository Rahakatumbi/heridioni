import Api from './Api'
export default{
    register(datta){return Api().post('/branche',datta)},
    branches(){return Api().get('branche')},
    findData(id){return Api().get('depotData/'+id)},
}