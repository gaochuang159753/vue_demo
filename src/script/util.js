'use strict';
/**
 * 服务器地址
 * @return {String} url
 */
exports.url = 'http://192.168.3.222:8088/hrm_test/api.do';
exports.uploadURL = 'http://192.168.3.222:8088/hrm_test/upload.do?method=spwSalaryPay/leadSpwSalaryPays',

/**
 * 时间戳转换
 * @param {Number} time 时间戳
 * @return {String} 年-月-日格式时间
 */

exports.dataTransform = function (time){
     return new Date(parseInt(time)).toLocaleString().replace(/:\d{1,2}$/,' '); 
}
