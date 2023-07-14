<template>
  <div>
    <div>主企业信息：成都产业投资集团有限公司</div>
    <div style="display: flex;justify-content: space-between;">
      <div style="width:47%;border: 1px solid #ccc;padding:1%">
        <el-input
          placeholder="请输入内容"
          v-model="searchContent"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
          ></i>
        </el-input>
        <el-tree
          check-strictly
          ref="tree"
          @check-change="changeSelect()"
          :data="treeData"
          show-checkbox
          node-key="id"
          default-expand-all
        >
        </el-tree>
      </div>
      <div style="width:47%;border: 1px solid #ccc;padding: 1%;">
        <div
          v-for="item, index in checkedItems"
          :key="item.id"
          style="display: flex;justify-content: space-between;"
        >
          <div>{{ item.label }}</div>
          <i
            class="el-icon-close"
            @click="removeCheckedItem(index)"
          ></i>
        </div>
      </div>
    </div>
    <div style="width:299px;margin-top: 30px;">
      <div style="display: flex;width: 100%;">
        <button style="padding:5px 10px">未设置</button>
        <div style="
          align-self: self-end;
          border-top: 1px  dashed rgb(17, 17, 17);
          height: 50%;
          margin-left: auto;
          text-align: right;
          flex: 1;">请修改国资委信息，关联上级国资委</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent: '',
      treeData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      checkedItems: []
    }
  },
  methods: {
    changeSelect() {
      this.checkedItems = this.$refs.tree.getCheckedNodes()
      console.log(this.checkedItems)
    },
    removeCheckedItem(index) {
      this.checkedItems.splice(index, 1)
      this.$refs.tree.setCheckedNodes(this.checkedItems)
    }
  }
}
</script>