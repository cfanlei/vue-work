<template>
  <div>
    <div
      style='display:flex;width:100%;font-size:18px'
      v-for="info in item"
      :key="getKeyId()"
    >
      <div style='background-color:#f7f7f6;width:25%;text-align:right;border:#ddd 1px solid;padding:5px'>{{ info[0].name }}</div>
      <div style='border:1px solid #ddd;padding:5px;width:25%;text-align:left;border-left:0;color:#666'>{{ info[0].name }}
      </div>
      <div style='background-color:#f7f7f6;width:25%;text-align:right;border:#ddd 1px solid;padding:5px;border-left:0'>
        {{ info[1]?.name ?? '' }}</div>
      <div style='border:1px solid #ddd;padding:5px;width:25%;text-align:left;border-left:0;color:#666;'>
        {{ info[1]?.name ?? '' }}</div>
    
  </div>
</template>
<script>
let keyId = 0;
export default {
  mounted() {
    let temp = new Map()
    let index = -1
    try {
      this.itemData.forEach((ite) => {
        let test = ++index
        if (index >= this.itemData.length) { throw new Error }

        temp.set(this.itemData[index], this.itemData[++index])
      })
    } catch (e) { }
    this.item = [...temp]
    console.log(this.item)
  },
  data() {
    return {
      itemData: [
        { name: 11 },
        { name: 22 },
        { name: 33 },
        { name: 44 }
      ],
      item: [[{ name: 1010 }, { name: 2900 }], [{ name: 1900 }, { name: 2880 }], [{ name: 1080 }, { name: 2900 }]]
    }
  },
  methods: {
    getKeyId() {
      return keyId++
    }
  }
}
</script>