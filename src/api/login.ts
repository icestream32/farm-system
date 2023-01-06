import service from "../utils/request";

/**
 * 登录
 * @param form 表单
 */
export const loginApi = (form : any) => {
    return service({
        url : '/backend/login',
        method : 'post',
        data : {...form}
    })
}

/**
 * 退出
 */
export const logoutApi = () => {
    return service({
        url : '/backend/logout',
        method : 'post'
    })
}