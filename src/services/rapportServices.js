import Api from './Api'
export default{
    approvisionnement(data){return Api().post('/arapport',data)},
    expedition(data){return Api().post('/epport',data)}
}