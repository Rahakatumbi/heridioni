import Api from './Api'

export default{
    register(data){
        return Api().post("/product",data)
    },
    product(){return Api().get("/products")}
}