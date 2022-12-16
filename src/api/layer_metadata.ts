// 导入接口服务
import service from "../utils/request";

/**
 * 添加图层元数据
 * @param params 图层元数据
 */
export const addLayerMetadata = (params : any) => {
    return service({
        url : 'layer_metadata',
        method : 'post',
        data : {...params}
    })
}

/**
 * 修改图层元数据
 * @param params 图层元数据
 */
export const editLayerMetadata = (params : any) => {
    return service({
        url : '/layer_metadata',
        method : 'put',
        data : {...params}
    })
}

/**
 * 图层元数据分页查询
 * @param params 分页参数
 */
export const getLayerMetadataList = (params : any) => {
    return service({
        url : '/layer_metadata/page',
        method : 'get',
        params
    })
}