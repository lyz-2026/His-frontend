<template>
  <div>
    <div>
      <el-input class="txt" placeholder="病例号" v-model="con"></el-input>
      <el-button type="primary" @click="queryBycaseNumber()">查询</el-button>
      <el-form class="form" ref="register" :model="register" label-width="80px">
        <!-- el-form-item:每个表单项的文字说明，对应原生H5中label或span标签 -->
        <el-row>
          <el-col :span="6">
            <el-form-item class="bd" label="病例号">
              <!-- el-input:原生H5的input标签 -->
              <el-input class="txt" :readonly="true" v-model="register.caseNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="姓名">
              <!-- el-input:原生H5的input标签 -->
              <el-input class="txt" :readonly="true" v-model="register.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="性别">
              <!-- <el-input class="txt" :readonly="true" v-model="register.gender|gender"></el-input> -->
              <span>{{register.gender|gender}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="年龄">
              <!-- el-input:原生H5的input标签 -->
              <el-input class="txt" :readonly="true" v-model="register.age"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item class="bd" label="身份证号">
              <!-- el-input:原生H5的input标签 -->
              <el-input class="idNumber" :readonly="true" v-model="register.idNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="挂号日期">
              <el-input class="txt" :readonly="true" v-model="register.visitDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="挂号级别">
              <!-- <el-input class="txt" :readonly="true" v-model="register.registLevId"></el-input> -->
              <span>{{register.registLevel.registName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="挂号科室">
              <!-- <el-input class="txt" :readonly="true" v-model="register.deptId"></el-input> -->
              <span v-show="register.caseNumber!=''">{{register.dept.deptName}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item class="bd" label="看诊医生">
              <span v-show="register.caseNumber!=''">{{register.user.realName}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item class="bd" label="状态">
              <!-- <el-input class="txt" :readonly="true" v-model="register.visitState"></el-input> -->
              <span>{{register.visitState|visitStateid}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">

          </el-col>
          <el-col :span="6">

          </el-col>
        </el-row>

      </el-form>
    </div>
    <div>
      <el-table class="tb" style="width: 50%" ref="multipleTable" :data="checkrecorditems" tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="100">
        </el-table-column>
        <el-table-column label="项目名称" width="100">
          <template :disable="disable" slot-scope="scope">{{ scope.row.ci.itemName }}</template>
        </el-table-column>
        <el-table-column label="单价" width="100">
          <template :disable="disable" slot-scope="scope">{{ scope.row.ci.price }}</template>
        </el-table-column>
        <el-table-column label="数量" width="100">
          <template :disable="disable" slot-scope="scope">{{ scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="金额" width="100">
          <template :disable="disable" slot-scope="scope">{{ scope.row.ci.price*scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template :disable="disable" slot-scope="scope">{{ scope.row.payStatus|checkitemrecordvisitState}}</template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button :disabled="disable" @click="endCheck()">完成检查</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JianCha',
    data: function() {
      return {

        checkcon: '',
        checkrecorditems: [],
        con: '',
        register: {
          id: '',
          userId: '',
          caseNumber: '',
          realName: '',
          gender: '',
          age: '',
          idNumber: '',
          registLevel: {
            registName: ''
          },
          dept: {
            deptName: ''
          },
          user: {
            realName: ''
          },
          visitDate: '',
          visitState: ''
        },
        medicalrecord: {
          registId: '',
          caseNumber: '',
          description: '',
          medicalHistory: '',
          familyHistory: '',
          initialResult: '',
          operatorId: sessionStorage.getItem('userid'),
          caseState: ''
        },
        realcheckitemrecord: [],
        ids: [],
        disable: false
      }
    },
    methods: {
      handleSelectionChange: function(val) {
        this.ids.splice(0, this.ids.length);
        for (let v of val) {
          this.ids.push(v.id);
        }
      },
      toggleSelection: function(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 按病例号查询挂号信息
      queryBycaseNumber: function() {
        let that = this;
        this.$axios.get('RegisterController/findRegisterByCaseNumber?caseNumber=' + this.con)
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.register = responseBean.data;
              that.listCheckRecordSub();
            }
          })
          .catch(error => {
            if (error.response) {
              let responseBean = error.response.data;
              alert(responseBean.msg);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });

      },
      //查询特定病人的检查项明细
      listCheckRecordSub: function() {
        let that = this;
        this.$axios.get('CheckRecordController/listCheckRecordSub?registerId=' + this.register.id)
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.checkrecorditems = responseBean.data;
            }
          })
          .catch(error => {
            if (error.response) {
              let responseBean = error.response.data;
              alert(responseBean.msg);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });
      },
      // 结束检查方法
      endCheck: function() {
        let that = this;
        let checkRecordExt = {
          list: this.ids,
          payStatus: 2
        }
        this.$axios.post('CheckRecordController/updateCheckItemRecord', checkRecordExt)
          .then(resp => {
            if (resp.status == 200) {
              let result = resp.data;
              if (result > 0) {
                alert('更新成功');
                for (let c of that.checkrecorditems) {
                  c.payStatus = 2;
                }
                this.$router.go(0);
                that.checkrecorditems.sort();
                that.disable = true;
              }
            }
          })
          .catch(error => {
            if (error.response) {
              let responseBean = error.response.data;
              alert(responseBean.msg);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          });
      },
      //定义更新方法
      reload() {
        this.isRouterAlive = false,
          this.$nextTick(() => (this.isRouterAlive = true))
      }
    },
    filters: {
      // 性别处理
      gender: function(val) {
        return val == 1 ? '男' : (val == 2 ? '女' : '');
      },
      // 挂号级别名称显示
      level: function(val) {
        return val == 1 ? '普通' : (val == 2 ? '专家' : '');
      },
      // 挂号状态显示
      visitStateid: function(val) {
        if (val == 1)
          return "已挂号";
        if (val == 2)
          return "已接诊";
        if (val == 3)
          return "看诊结束";
        if (val == 4)
          return "已退号";
        if (val == '')
          return '';
      },
      // 检查的收费状态
      checkitemrecordvisitState: function(val) {
        if (val == 0)
          return "已开立";
        if (val == 1)
          return "已收费";
        if (val == 2)
          return "已检查";
        if (val == 3)
          return '已退费';
        return '';
      }
    },
  }
</script>

<style scoped="scoped">
  .txt {
    /* border: 1px solid red; */
    /* width: 300px; */
    width: 150px;
  }

  .form {
    margin-top: 10px;
  }

  .tb {
    margin: 0 auto;
  }
</style>
