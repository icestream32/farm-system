// 导入接口服务
import service from "../utils/request";

/**
 * 添加农田实测数据
 * @param params 农田数据对象
 */
export const addCropData = (params : any) => {
    return service({
        url: '/crop_data',
        method: 'post',
        data: {...params}
    })
}

/**
 * 编辑页面查询详情数据
 * @param id 数据id
 */
export const queryCropDataById = (id : number) => {
    return service({
        url: `/crop_data/${id}`,
        method: 'get'
    })
}

/**
 * 修改农田实测数据
 * @param params 农田数据对象
 */
export const editCropData = (params : any) => {
    return service({
        url: '/crop_data',
        method: 'put',
        data: {...params}
    })
}

/**
 * 查询农田实测数据
 * @param params 当前页page和分页数pageSize
 */
export const getCropDataList = (params : any) => {
    return service({
        url: '/crop_data/page',
        method: 'get',
        params
    })
}
