/*
 * @Author: cfanlei cfanlei@126.com
 * @Date: 2023-07-20 10:11:25
 * @LastEditors: cfanlei cfanlei@126.com
 * @LastEditTime: 2023-07-20 10:17:05
 * @FilePath: /vue-ele/hello-world/public/getXale.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
/**
 * @description: 
 * @param {*} startX
 * @param {*} startY
 * @param {*} height
 * @param {*} margin
 * @return [x,y] 返回x,y 坐标
 */
function getXale(startX,startY,height,margin){
    return [startX,startY+height+margin]
}