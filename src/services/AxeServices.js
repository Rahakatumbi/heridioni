import Api from './Api'
export default{
    register(data){return Api().post('/axe',data)},
    axe(id){return Api().get('/axe/',id)},
    axes(){return Api().get('/axes')}
}