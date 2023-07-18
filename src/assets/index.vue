<template>
  <div>
    <div
      style="display: flex; width: 100%; font-size: 18px; margin: -1px 0"
      v-for="(info, index) in item"
      :key=""
    >
      <div
        style="
          background-color: var(--cs-table-header-background-color, #f5f6fa);
          width: 25%;
          text-align: right;
          border: #ddd 1px solid;
          padding: 5px;
        "
      >
        {{ info[0].name }}
      </div>
      <el-tooltip
        class="item"
        effect="dark"
        :content="info[0].responsibilty"
        placement="top"
      >
        <div
          style="
            border: 1px solid #ddd;
            padding: 5px;
            width: 25%;
            text-align: left;
            border-left: 0;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
          "
        >
          {{ info[0].responsibilty }}
        </div>
      </el-tooltip>
      <div
        style="
          background-color: var(--cs-table-header-background-color, #f5f6fa);
          width: 25%;
          text-align: right;
          border: #ddd 1px solid;
          padding: 5px;
          border-left: 0;
        "
      >
        {{ info[1]?.name ?? '' }}
      </div>

      <el-tooltip
        class="item"
        effect="dark"
        :content="info[1]?.responsibilty ?? ''"
        placement="top"
      >
        <div
          style="
            border: 1px solid #ddd;
            padding: 5px;
            width: 25%;
            text-align: left;
            border-left: 0;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
          "
        >
          {{ info[1]?.responsibilty ?? '' }}
        </div>
      </el-tooltip>
    </div>
  </div>
</template>
