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
              <!-- <el-input class="txt" :readonly="true" v-model="register.visitState|visitStateid"></el-input> -->
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
      <el-select class="txt" v-model="checkcon" placeholder="请选择检查项目">
        <el-option v-for="checkitem in checkitemlist" :key="checkitem.id" :label="checkitem.itemName"
          :value="checkitem.id">
        </el-option>
      </el-select>
      <el-button type="primary" :disabled="register.caseNumber==''||register.visitState==3" @click="onSubmit">添加检查项
      </el-button>
    </div>
    <div>
      <el-table :data="checkrecorditems">
        <el-table-column label="检查项" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.itemName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input class="txt" v-model="scope.row.amount"></el-input>

          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <el-button type="primary" :disabled="checkrecorditems.length==0" @click="sendCheckApp">提交检查申请</el-button>

    </div>

  </div>
</template>

<script>
  export default {
    name: 'MenZhenJCS',
    data: function() {
      return {
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
        // 全部检查项目的集合，以便于放置到下拉列表中
        checkitemlist: [],
        checkcon: '',
        checkrecorditems: [],

      }
    },
    methods: {
      handleDelete: function(index) {
        this.checkrecorditems.splice(index, 1);
      },
      onSubmit: function() {
        let checkItem = {};
        // 集合checkrecorditems里边已经有相应检查项目
        if (this.queryCheckItemRecordList(this.checkcon)) {
          // 找到该检查项目
          for (let c of this.checkrecorditems) {
            if (c.checkItemId == this.checkcon) {
              // 对应的检查项目加1
              c.amount += 1;
              break;
            }
          }
          this.checkrecorditems.sort();
        } else {
          // 集合checkrecorditems里边没有相应检查项目
          for (let c of this.checkitemlist) {
            if (c.id == this.checkcon) {
              for (let k in c) {
                if (k == "id") {
                  checkItem["checkItemId"] = c[k];
                } else {
                  checkItem[k] = c[k];
                }

              }
              checkItem.amount = 1;
              // 提供挂号者的Id
              checkItem.registerId = this.register.id;
              break;
            }
          }
          // 把检查项目添加到集合checkrecorditems中
          this.checkrecorditems.push(checkItem);

        }

      },
      // 发送检查申请
      sendCheckApp: function() {
        let that = this;
        this.$axios.post('CheckRecordController/addCheckItemRecord', this.checkrecorditems)
          .then(resp => {
            if (resp.status == 200) {
              let result = resp.data;
              if (result > 0) {
                alert('检查项目添加成功');
                // 申请成功后清除申请记录
                that.checkrecorditems.splice(0, that.checkrecorditems.length);
              }
            }
          })
          .catch(error => {
            if (error.response) {
              let responseBean = error.response.data;
              alert(responseBean.msg);
            } else if (error.request) {} else {}
          });
      },
      // 按病例号查询挂号信息
      queryBycaseNumber: function() {
        let that = this;
        this.$axios.get('RegisterController/findRegisterByCaseNumber?caseNumber=' + this.con)
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.register = responseBean.data;
              // 给治疗记录的属性赋值
              that.medicalrecord.registId = that.register.id;
              that.medicalrecord.caseNumber = that.register.caseNumber;
              that.queryMedicalRecordByMRID();
            }
          })
          .catch(error => {
            if (error.response) {
              let responseBean = error.response.data;
              alert(responseBean.msg);
            } else if (error.request) {} else {}
          })
      },
      queryMedicalRecordByMRID: function() {
        let that = this;
        this.$axios.get('MedicalRecordController/findMedicalRecordByMRId', {
            params: {
              caseNumber: this.medicalrecord.caseNumber,
              registId: this.medicalrecord.registId
            }
          })
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.medicalrecord = responseBean.data;
              if (that.medicalrecord.caseState == 2) {
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
      // 按医生ID查询其所属科室
      queyDeptbyId: function() {

      },
      // 检查项目的下来列表的数据来源
      queryCheckItemRecordList: function(id) {
        for (let c of this.checkrecorditems) {
          if (c.checkItemId == id) {
            return true;
          }
        }
        return false;
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
            console.log(error.request);
          } else {
            console.log('Error', error.message);
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
