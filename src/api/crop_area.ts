import service from "../utils/request";

export const addCropArea = (param : any) => {
    return service({
        url : '/crop_area',
        method : 'post',
        data : {...param}
    })
}

/**
 * 删除作物面积数据信息
 * @param id 作物面积数据id
 */
export const deleteCropArea = (id : number) => {
    return service({
        url : '/crop_area',
        method : 'delete',
        data : {id}
    })
}

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