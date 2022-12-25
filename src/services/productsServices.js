import Api from './Api'

export default{
    register(data){
        return Api().post("/product",data)
    },
    products(){return Api().get("/products")}
}