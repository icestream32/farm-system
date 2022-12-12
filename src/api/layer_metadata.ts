// 导入接口服务
import service from "../utils/request";

export const getLayerMetadataList = (params : any) => {
    return service({
        url : '/layer_metadata/page',
        method : 'get',
        params
    })
}