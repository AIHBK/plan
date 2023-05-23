import serviceAxios from './axios.js'

/**
 * 获取
 * @param data string 用户id 
 * @returns 
 */
export async function getPlanData(data) {
  return await serviceAxios({
    method: 'get',
    url: `/getPlanData?id=${data}`
  })
}
