import Api from './Api'
export default{
    register(data){return Api().post('/order',data)},
    orders(){return Api().get('/orders')},
    orderinfo(id){return Api().get('/order/'+id)},
    solveOder(data){return Api().post('/solveOrder',data)},
    facturation(data){return Api().post('/facturation',data)},
}