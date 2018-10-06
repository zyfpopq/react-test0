/*
包含n个工具函数的模块
 */
/*
判断用户是否完善信息:user.header
判断用户类型:user.type
返回对应的路由路径
 */
export function getRedirectTo(type,header) {
    let path = ''
    //type
    if(type==='laoban'){
        path='/laoban'
    }else {
        path='/dashen'
    }
    //header
    if(!header) {
        path +='info'
    }
    return path
}