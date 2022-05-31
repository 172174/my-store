import axios from "axios";
import router from "./router";
import ElementUI from "element-ui";
axios.defaults.baseURL = "http://localhost:8099/admin"

const request = axios.create({
    timeout: 5000,
    headers: {
        'content-Type': "application/json;charset=utf-8"
    }
})

request.interceptors.request.use(config => {
    config.headers['Authorzation'] = localStorage.getItem("token")
    return config
})

request.interceptors.response.use(response => {

        let res = response.data
        if (res.code === 200) {
            return response
        } else {
            ElementUI.Message.error(!res.msg ? "系统异常" : res.msg)
            return Promise.reject(response.data.msg)
        }
    }, error => {

        if (error.response.data) {
            error.Message = error.response.data.msg
        }


        if (error.response.status === 401) {
            router.push("/login")
        }


        ElementUI.Message.error(error.Message, { duration: 3000 })

        return Promise.reject(error)
    }


)

export default request