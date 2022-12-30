import service from "../utils/request";

/**
 * 修改作物面积数据信息
 * @param params 作物面积数据
 */
export const editCropArea = (params : any) => {
    return service({
        url : '/crop_area',
        method : 'put',
        data : {...params}
    })
}

/**
 * 查询作物面积数据信息
 * @param params 分页查询信息
 */
export const getCropAreaList = (params : any) => {
    return service({
        url : '/crop_area',
        method : 'get',
        params
    })
}