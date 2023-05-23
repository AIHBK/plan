import serviceAxios from './axios.js'

/**
 * 获取天气信息
 * @param data string 城市code
 * @returns 
 */
export async function getWeather(data) {
  return await serviceAxios({
    method: 'get',
    url: `https://restapi.amap.com/v3/weather/weatherInfo?key=08d6935cf8e7772623c49bb4cadce13a&extensions=all&city=${data}`
  })
}
