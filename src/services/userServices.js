import Api from "./Api";

export default{
    register(data){return Api().post('user',data)},
    display(){return Api().get('/users')},
    login(data){return Api().post('login',data)}
}