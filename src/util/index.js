/**
 * 判断对象属性是否为空
 * @param {*} obj 
 * @returns 
 */
export function empty(obj) {
  for (let key in obj){
    if (obj[key] === 0) continue;
    if (!obj[key] || obj[key] === '') {    
      console.log('含有空值', `${key}:${obj[key]}`)
      return true
    }
  }
  console.log('非空')
  return false;    //非空
}

/**
 * 时间转换
 * @param {*} dateData 国际时间 
 * @returns 
 */
export function formatDate (dateData) {
  var date = new Date(dateData);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var weekday = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (weekday < 10) {
    weekday = "0" + weekday;
  }
  return year + "-" + month + "-" + weekday;
}