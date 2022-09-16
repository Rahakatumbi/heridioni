import Api from './Api'
export default{
    register(data){return Api().post('/axe',data)},
    axes(){return Api().get('/axe')}
}