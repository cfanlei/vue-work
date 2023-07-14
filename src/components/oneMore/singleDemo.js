import { singleIns } from "./singleInstance.js";
let firstIns = singleIns()
let secondIns = singleIns()

console.log(firstIns === secondIns)


`
<el-tooltip class="item" effect="dark" :content="info[0].responsibilty" placement="top">
          <div style='border:1px solid #ddd;padding:5px;width:25%;text-align:left;border-left:0;color:#666;
           overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 4;'>{{ info[0].responsibilty }}</div>
        </el-tooltip>
`
const Interactive = this.getParams('Interactive');
Interactive.refreshTree()
profile_picture:[{\"name\":\"微信截图_20230619165345.png\",\"id\":\"1670960751526449152\"}]