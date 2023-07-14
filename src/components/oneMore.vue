<template>
    <div>
        <el-row style="border:#ccc 1px solid;font-size: 14px;">
            <el-col :span="17">
                <div style="padding: 10px;max-height: 180px;overflow-y: scroll;border-right: 1px solid #ccc;">
                    <div style="padding-left: 10px;border-left: #2d9ded 2px solid;">企业信息
                        <el-button style="opacity: 0;" size="small"></el-button>
                    </div>
                    <div style="display: flex;height: 28px;background-color: #ccc;padding: 5px;margin-top:10px"
                        v-for="i in 3">
                        <img src="../assets/dc-icon-省级.png" />
                        <img src="../assets/我的企业.png" />
                        <span style="align-self: self-end;">1级</span>
                        <div style="margin-left:30px;align-self: center;">四川发展(控股)有限责任公司</div>
                        <div style="margin-left:30px;align-self: center;">91510100MABTMDUK3F</div>
                        <div style="margin-left:30px;align-self: center;">境内</div>
                        <div style="margin-left:30px;align-self: center;">开业</div>
                        <div style="margin-left:auto;">
                            <el-tag style="margin-right:10px" type="success">主</el-tag>
                            
                            <el-button icon="el-icon-close" size="mini" circle></el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div style="padding: 10px;max-height: 180px;overflow-y: scroll;">
                    <div
                        style="padding-left: 10px;border-left: #2d9ded 2px solid;display: flex;justify-content: space-between;">
                        <div>领导班子 共(0)人</div>
                        <el-button type="primary" size="small">领导班子管理</el-button>
                    </div>
                    <div style="display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;">
                        <div style="width:47%;
                            height: 28px;
                            background-color: #ccc;
                            padding: 5px;
                            margin-top:10px " v-for="i in 3" :key="i">
                            <span>吴晓曦</span><span style="margin-left:10px">(党委书记、董事长）</span>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    
    methods:{
        getLevel(code){
            
        }
    },
    crea
}
</script>