import axios, {AxiosInstance} from "axios"
type Params = {[key : string | number] : string | number | undefined }
type Payload = {
    url : string,
    params? : Params
}
function createAxiosInstance () {
    const instance : AxiosInstance  = axios.create({
        timeout: 60 * 4 * 1000,
        headers: {
          "Content-Type": `application/json`,
        },
      })
    return instance
}


function postApi ( payload : Payload) {
  return createAxiosInstance().post( payload.url,  payload.params)
}

function getApi (payload :Payload ) {
  return createAxiosInstance().get(payload.url,  {
    params : {...payload.params}
  })
}

export { postApi, getApi }