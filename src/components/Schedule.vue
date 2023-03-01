<template>
  <div>
    <!-- <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 20%;">
    </el-date-picker> -->
    <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column label="周一上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X10" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周一下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X11" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周二上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X20" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周二下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X21" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周三上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X30" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周三下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X31" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周四上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X40" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周四下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X41" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周五上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X50" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周五下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X51" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周六上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X60" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周六下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X61" true-value="1" false-value="0">

        </template>
      </el-table-column>

      <el-table-column label="周日上午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X70" true-value="1" false-value="0">

        </template>
      </el-table-column>
      <el-table-column label="周日下午">
        <template slot-scope="scope">
          <input type="checkbox" v-model="tableData[scope.$index].X71" true-value="1" false-value="0">

        </template>
      </el-table-column>
    </el-table>
    <input type="button" v-on:click="createRule" value="提交排班规则">
  </div>
</template>

<script>
  export default {
    name: 'Schedule',
    data: function() {
      return {
        tableData: [{

          name: '王小虎',

        }, {

          name: '王小虎',

        }, {

          name: '王小虎',

        }, {

          name: '王小虎',

        }],

        selectedItems: [],
        week: []
      }
    },
    methods: {
      handleSelectionChange: function(val) {
        this.selectedItems = val;
        console.log(val);

      },
      createRule: function() {
        for (let k in this.selectedItems) {
          this.week[k] = '';
          if (this.selectedItems[k].X10 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X11 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X20 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X21 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X30 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X31 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X40 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X41 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X50 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X51 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X60 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X61 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X70 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          if (this.selectedItems[k].X71 == '1') {
            this.week[k] += '1';
          } else {
            this.week[k] += '0';
          }
          console.log(this.week[k]);
        }
      }
    }

  }
</script>

<style>
</style>
