/*
 * @Author: cfanlei cfanlei@126.com
 * @Date: 2023-06-27 08:58:05
 * @LastEditors: cfanlei cfanlei@126.com
 * @LastEditTime: 2023-07-20 19:22:56
 * @FilePath: /vue-ele/hello-world/src/components/echarts/options.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let tempLevel = -1
let tempQuequ =[]
function BFS(tree) {
    tempLevel++;
    let childrenList = []
    tempQuequ.push(tree)
    // treeList.forEach((item, index) => {
    //     tempQuequ.push(item)
    // })
    let itemIndex = 0 //层级的第几个节点
    while (tempQuequ.length > 0) {
        let i = tempQuequ.shift()
        //let type = tempLevel > 0 ? "thrid-company" : "sub-company"
        //if (!i.parentId) { i.parentId = "sub-root-enterpriseDraftTreeList" }
        const xy = getXale(treeList, i, tempLevel)
        nodes.push({
            id: i.id,
            x: xy[0],
            y: xy[1],
            type,
            data: i,
            size: [xy[2], xy[3]],
            anchorPoints: [
                [0.5, 0],
                [0.5, 1],
            ]
        })
        edges.push({
            source: i.parentId,
            target: i.id,
            type: "vhv"
        })
        if (Array.isArray(i.children) && i.children.length > 0) {
            childrenList = [...childrenList, ...i.children]
        }
        itemIndex++
    }
    if (childrenList.length > 0) {
        BFS(childrenList)
    }

}