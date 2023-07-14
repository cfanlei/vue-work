const vmIns = this


const template = `
<div>
    <el-row
      :gutter="20"
    >
      <el-col :span="24">
        <el-input
          placeholder="搜索国资委名称或信用代码"
          v-model="searchValue"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
          ></i>
        </el-input>
      </el-col>
    </el-row>

    <el-row
      style="padding: 5px;background-color:#ccc;margin-top:10px"
    >
      <el-col
        :span="2"
        class="flex"
      >
        <i class="el-icon-s-home"></i>
      </el-col>
      <el-col
        :span="20"
        class="flex"
      >
        <div>国务院国资委</div>
      </el-col>
    </el-row>

    <el-row
      style="padding: 5px;"
      v-if="data.length === 0"
    >
      <el-col
        :span="24"
        style="text-align: center;"
      >
        <div style="margin:auto">
          <img
            src="/cisdi-eap/static/img/empty-data.956e0803.svg"
            class="el-image__inner"
          ></img>
          <div>暂无数据，请重试</div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-tree
          :data="data"
          lazy="true"
          @node-click="nodeClick"
          :props="defaultProps"
          :default-expand-all="false"
          ref="tree"
          node-key="id"
          :expand-on-click-node="false"
        >
          <div
            slot-scope="{ node, data }"
            style="width:100%;"
          >
          <div v-if="data.id !=='setting'" style="display:flex;justify-content: space-between;">
                <div style="display:flex;align-items:center;">
              <div style="
            padding: 4px 7px; 
            background-color: #eef1f6;
            white-space:nowrap;
            margin:10px;
            box-shadow:4px 3px 4px #888;
          ">
                {{ getLevel(data) }}
              </div>
              <div v-html="useBrightenKeyword(node.label,searchValue)"></div>
            </div>
            <el-popover
              placement="bottom-end"
              width="100"
              trigger="hover"
            >
              <div style ="padding:10px 0;cursor:pointer;" @click="moveup(node, data)"  onMouseOver="this.style.backgroundColor='#b3d4fc'"
 onMouseOut="this.style.backgroundColor='#fff'" >上移</div>
              <div style ="padding:10px 0;cursor:pointer" @click="movedown(node, data)"   onMouseOver="this.style.backgroundColor='#b3d4fc'"
 onMouseOut="this.style.backgroundColor='#fff'" >下移</div>
              <div @click="addnew(node, data)" style="padding:10px 0;cursor:pointer"   onMouseOver="this.style.backgroundColor='#b3d4fc'"
 onMouseOut="this.style.backgroundColor='#fff'" v-if="data.corpLevel !=='district'" >添加下级</div>
              <i
                slot="reference"
                class="el-icon-more"
              ></i>
            </el-popover>
            </div>
            <div v-if="data.id =='setting'" id = 'setting'>
                <div style="background-color: red;"> dadf</div>
            </div>
          </div>

        </el-tree>
      </el-col>
    </el-row>

  </div>
`
const option = {
  
  template,
  watch: {
    searchValue(val) {
      Interactive.refreshTree({key:val}).then(()=>{
        Interactive.refreshTable({key:val})
      })
    }
  },
  data() {
    return {
      searchValue: '',
      data: [
],
      defaultProps: {
        children: 'children',
        label: 'corpNm',
        isLeaf:function(data,node){
          return data.id ==='setting'
        }
      }
    }
  },
  mounted(){
    
  },
  methods: {
    useBrightenKeyword(result, keyword){
      const Reg = new RegExp(keyword, 'i')
      let res = '';
      if (result) {
        res = result.replace(Reg, `<span style="color: #f33;">${keyword}</span>`)
        return res
      }
    },
    nodeClick(treeNode, htmlNode, treeVm) {
      Interactive.refreshTable({topCorpId:treeNode.id})
    },
    moveup(node, data) {
      Interactive.move(node, data,1)
    },
    movedown(node, data) {
      Interactive.move(node, data,2)
    },
    addnew(node, data) {
      const level = ['district','city_level','province_level']
      const  corpLevelIndex = level.indexOf(data.corpLevel) === -1?2:level.indexOf(data.corpLevel) -1
      if(corpLevelIndex<0) return 
      const corpLevel = level[corpLevelIndex]
      const  superCorpId = data.id
      const  superCorpCode = data.corpCd
      Interactive.add({
        editContent:{
          superCorpId,
          corpLevel,
          superCorpCode
        }
      })
    },
    addItem(){
      Interactive.add()
    },
    getLevel(data){
      let level = ''
      switch (data.corpLevel) {
      case 'province_level':
        level = '省级'
         break;
      case 'city_level':
        level = '市级'
        break;
      default:
        level = '区级'
      }    
      return level
    }
  },
}
const vm   = new Vue(option).$mount('#my-tree-root1')
class Interactive{
  static move(node,data,upOrDown){
    const id = data.id
    const self = vmIns
    vmIns.runApi('1660933623770738688',{upOrDown,id}).then(res=>{
      if(res.data.code){
        //失败
        self.$eapNote.error({
          title: '提示',
          message: res?.data?.message,
          duration: 3000
        })
      }else{
        vmIns.runApi('1660933159801024512',{}).then(res=>{
          this.refreshTree()
          self.$eapNote.success({
            title: '提示',
            message:'成功',
            duration: 3000
          })
        });
      }
    });
  }
  static refreshTree(paramsKey = {}){
    const mapEnterpriseDraftTree = (tree)=>{
      tree.corpNm = tree.fullName
      if(tree.children&&tree.children.length>0){
        tree.children.forEach(child=>{
          mapEnterpriseDraftTree(child)
        })
      }
    }
    const mapTree = (tree)=>{
      if(tree.enterpriseDraftTree.length){
        tree.enterpriseDraftTree.forEach(child=>{
          mapEnterpriseDraftTree(child)
        })
      }
      if(tree.children.length>0){
        tree.children.forEach(child=>{
          mapTree(child)
        })
      }
      if(tree.enterpriseDraftTree){
        tree.children = [...tree.enterpriseDraftTree,...tree.children]
      }
    }
    return vmIns.runApi('1663822800560549888',{enterpriseLevelEnum:'LEGAL_PERSON_LEVEL'}).then(res=>{
      const setting = {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "null",
          "corpNm": "df",
          "corpCd": null,
          "parentId": null,
          "number": null,
          "children": [],
          "superCorpName": null,
          "id": "setting"
        }
        res.data.provinceGroup.forEach((t)=>{
           mapTree(t)
         })
         res.data.unsetGroup.forEach((t)=>{
           mapEnterpriseDraftTree(t)
         })
      vm.data = [...res.data.provinceGroup,setting,...res.data.unsetGroup]
      if(vm.data.length === 1) return
      
      this.refreshTable({topCorpId:vm.data[0].id})
      vmIns.$nextTick(()=>{
        const html = `
          <div style="display: flex;width: 100%;">
            <button style="padding:5px 10px" class="el-button el-button--default" disabled>未设置</button>
            <div style="
              align-self: self-end;
              border-top: 1px  dashed rgb(17, 17, 17);
              height: 50%;
              margin-left: auto;
              text-align: right;
              flex: 1;
              font-size:12px">
              请修改国资委信息，关联上级国资委
            </div>
          </div>
        `
        //未设置 -样式修改
        document.getElementById('setting').parentElement.parentElement.parentElement.innerHTML=html
      })
      return [...res.data.provinceGroup,...res.data.unsetGroup]
    });
  }
  static refreshTable(data){
    const tableIns = vmIns.getWidgetRef('QueryTable38312')
    tableIns.paramsRecord ={}
    tableIns.getData(data)
  }
  static add(params={}){
    vmIns.openDialog({
        pageId: '1663027809709973504',
        loadData: false,
        width:'900px',
        options: {},
        title:'新增',
        params,
        callbackParam: {},
        callback: () => {
          this.refreshTree()
        }
      });
  }
}
this.setParams({Interactive});
//首次加载
Interactive.refreshTree()
