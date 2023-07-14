<template>
  <div>
    <el-row
      :gutter="20"
      style="padding:5px;"
    >
      <el-col :span="16">
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
      <el-col :span="8">
        <el-button type="primary">添加省国资委</el-button>
      </el-col>
    </el-row>

    <el-row
      :gutter="20"
      style="padding: 5px;"
    >
      <el-col
        :span="2"
        class="flex"
      >
        <i class="el-icon-s-home"></i>
      </el-col>
      <el-col
        :span="22"
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

    <el-row style="padding: 5px;">
      <el-col :span="24">
        <el-tree
          icon-class="el-icon-more"
          @node-click="nodeClick()"
          :data="data"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree"
          node-key="id"
          :expand-on-click-node="false"
        >
          <div
            slot-scope="{ node, data }"
            style="width:100%;display: flex;justify-content: space-between;"
          >
            <div v-if="data.id !=='setting'">
                <div style="display:flex;align-items:center;">
              <div style="
            color: aqua; 
            padding: 4px 7px; 
            background-color: #ddd;
            white-space:nowrap;
            margin:10px;
            box-shadow:4px 3px 4px #888;
          ">
                {{ getLevel(data) }}
              </div>
              <div>{{ node.label }}</div>
            </div>
            <el-popover
              placement="bottom-start"
              width="200"
              trigger="hover"
            >
              <div @click="moveup(node, data)">上移</div>
              <div @click="movedown(node, data)">下移</div>
              <div @click="addnew(node, data)">添加下级</div>
              <i
                slot="reference"
                class="el-icon-more"
              ></i>
            </el-popover>
            </div>
            <div v-if="data.id =='setting'">
                <div style="background-color: red;"> dadf</div>
            </div>
          </div>

        </el-tree>
      </el-col>
    </el-row>

  </div>
</template>

<script>

export default {
  name: 'page1',
  watch: {
    searchValue(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed:{
    getLevel(data){
      let level = ''
      switch (data.corpLevel) {
      case 'province_level':
        level = '省级'
         break;
  
      default:
        level = '市级'
      }    
      return ()=>level
    }
  },
  data() {
    return {
      searchValue: '',
      data: [
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          corpNm: "重庆市国有资产监督管理委员会",
          "corpCd": "11500000709486001B",
          "parentId": null,
          "number": 1,
          "children": [
            {
              "enterpriseDraftTree": null,
              "superCorpId": "1657302564583731220",
              "isDelete": "0",
              "firstLevelNumber": null,
              "corpLevelName": null,
              "corpLevel": "district",
              "corpNm": "dfsadfkkf",
              "corpCd": "dfldf,dmvvmvovovov",
              "parentId": "1657302564583731220",
              "number": 1,
              "children": [],
              "superCorpName": null,
              "id": "1663858922016550913"
            }
          ],
          "superCorpName": null,
          "id": "1657302564583731220"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "福建省国资委",
          "corpCd": "91110000100009563L",
          "parentId": "1659074188865662976",
          "number": 1,
          "children": [
            {
              "enterpriseDraftTree": null,
              "superCorpId": "1657302564583731211",
              "isDelete": "0",
              "firstLevelNumber": null,
              "corpLevelName": null,
              "corpLevel": "city_level",
              "corpNm": "werww",
              "corpCd": "fsdfdkfkdsfkdkfkfk",
              "parentId": "1657302564583731211",
              "number": 1,
              "children": [],
              "superCorpName": null,
              "id": "1663857281360015361"
            }
          ],
          "superCorpName": null,
          "id": "1657302564583731211"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "河北国资委",
          "corpCd": "91110000100009563C",
          "parentId": null,
          "number": 2,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731201"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "天津国资委",
          "corpCd": "91110000100009563B",
          "parentId": "1659074188865662976",
          "number": 2,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731202"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "北京国资委",
          "corpCd": "91110000100009563A",
          "parentId": "1659074188865662976",
          "number": 2,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731200"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "山西国资委",
          "corpCd": "91110000100009563D",
          "parentId": "1659074188865662976",
          "number": 4,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731203"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "辽宁国资委",
          "corpCd": "91110000100009563E",
          "parentId": "1659074188865662976",
          "number": 5,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731204"
        },
        {
              "enterpriseDraftTree": null,
              "superCorpId": "1657302564583731220",
              "isDelete": "0",
              "firstLevelNumber": null,
              "corpLevelName": null,
              "corpLevel": "district",
              "corpNm": "dfsadfkkf",
              "corpCd": "dfldf,dmvvmvovovov",
              "parentId": "1657302564583731220",
              "number": 1,
              "children": [],
              "superCorpName": null,
              "id": "setting"
            },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "吉林国资委",
          "corpCd": "91110000100009563F",
          "parentId": "1659074188865662976",
          "number": 6,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731205"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "黑龙江国资委",
          "corpCd": "91110000100009563G",
          "parentId": "1659074188865662976",
          "number": 7,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731206"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "上海国资委",
          "corpCd": "91110000100009563H",
          "parentId": "1659074188865662976",
          "number": 8,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731207"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "江苏国资委",
          "corpCd": "91110000100009563I",
          "parentId": "1659074188865662976",
          "number": 9,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731214"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "浙江国资委",
          "corpCd": "91110000100009563J",
          "parentId": "1659074188865662976",
          "number": 10,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731213"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "安徽国资委",
          "corpCd": "91110000100009563K",
          "parentId": "1659074188865662976",
          "number": 11,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731212"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "江西国资委",
          "corpCd": "91110000100009563M",
          "parentId": null,
          "number": 13,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731210"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "山东国资委",
          "corpCd": "91110000100009563N",
          "parentId": "1659074188865662976",
          "number": 14,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731209"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "河南国资委",
          "corpCd": "91110000100009563O",
          "parentId": "1659074188865662976",
          "number": 15,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731208"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "国资委1",
          "corpCd": "1",
          "parentId": null,
          "number": 20,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731218"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "国资委2",
          "corpCd": "2",
          "parentId": null,
          "number": 21,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731219"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": "1659074188865662976",
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "重庆国资委",
          "corpCd": "91110000100009563T",
          "parentId": "1659074188865662976",
          "number": 22,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731215"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "北京国资委24",
          "corpCd": "333333334333333333",
          "parentId": null,
          "number": 33,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731225"
        },
        {
          "enterpriseDraftTree": null,
          "superCorpId": null,
          "isDelete": "0",
          "firstLevelNumber": null,
          "corpLevelName": null,
          "corpLevel": "province_level",
          "corpNm": "西藏自治区国资委",
          "corpCd": "000000000000000000",
          "parentId": null,
          "number": 100,
          "children": [],
          "superCorpName": null,
          "id": "1657302564583731221"
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'corpNm'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.corpNm.indexOf(value) !== -1;
    },
    nodeClick(CB) {
      return (treeNode, htmlNode, treeVm) => {
        if (CB) {
          CB()
        }
      }
    },
    moveup(node, data) {
      console.log(node, data)
    },
    movedown(node, data) {
      console.log(node, data)
    },
    addnew(node, data) {
      console.log(node, data)
    },
  },
}
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}

.w100 {
  width: 100%;
}
</style>
