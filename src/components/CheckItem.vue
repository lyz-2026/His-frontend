<template>
  <div>
    <el-table :data="checkitemlist">
      <el-table-column label="检查项">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.checkitem.itemName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{scope.row.checkitem.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button style="margin-left: 10px" size="mini" type="danger" @click="handleDelete(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    name: 'CheckItem',
    data: function() {
      return {
        checkitemlist: [],
        checkitem: {
          id: '',
          itemName: '',
          price: ''
        }

      }
    },
    methods: {
      handleDelete: function(index) {
        this.checkrecorditems.splice(index, 1);
      }
    },
    created: function() {
      let that = this;
      this.$axios.get('CheckItemController/listCheckItem')
        .then(resp => {
          if (resp.status == 200) {
            let responseBean = resp.data;
            that.checkitemlist = responseBean.data;
          }
        })
        .catch(error => {
          if (error.response) {
            let responseBean = error.response.data;
            alert(responseBean.msg);
          } else if (error.request) {

          } else {

          }
        })

    }
  }
</script>

<style scoped="scoped">
  .txt {
    /* border: 1px solid red; */
    /* width: 300px; */
    width: 150px;
  }
</style>
