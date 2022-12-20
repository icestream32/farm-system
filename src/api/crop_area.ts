import service from "../utils/request";

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