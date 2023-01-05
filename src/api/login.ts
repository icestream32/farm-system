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