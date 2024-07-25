import axios, {AxiosInstance} from "axios"
type Params = {[key : string | number] : string | number | undefined }
type Payload = {
    url : string,
    params? : Params,
    data ? : Params
}
function createAxiosInstance () {
    const instance : AxiosInstance  = axios.create({
        timeout: 60 * 4 * 1000,
        headers: {
          "Content-Type": `application/x-www-form-urlencoded`,
        },
      })
    return instance
}


function postApi  ( payload : Payload) : Promise<any>  {
  return createAxiosInstance().post( payload.url,  payload.params)
}

const getApi = function (payload :Payload ) {
  return createAxiosInstance().get(payload.url,  {
    params : {...payload.params}
  })
}

const putApi = function (payload : Payload) {
  return createAxiosInstance().put(payload.url, payload.data)
}

const deleteApi = function(payload : Payload){
  // return createAxiosInstance().delete(payload.url)
  return axios.delete(payload.url)
}

export { postApi, getApi, putApi, deleteApi }