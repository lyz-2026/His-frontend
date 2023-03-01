<template>
  <div>

    <el-form class="form" ref="register" :model="register" label-width="80px">
      <!-- el-form-item:每个表单项的文字说明，对应原生H5中label或span标签 -->

      <el-form-item class="bd" label="病例号">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" :readonly="true" v-model="register.caseNumber"></el-input>
      </el-form-item>
      <el-form-item class="bd" label="姓名">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" v-model="register.realName"></el-input>
      </el-form-item>
      <el-form-item class="bd" label="性别">
        <el-radio-group class="txt" v-model="register.gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="bd" label="年龄">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" v-model="register.age"></el-input>
      </el-form-item>
      <el-form-item class="bd" label="出生日期">

        <!-- el-date-picker对应h5中input type="date" -->
        <el-date-picker class="txt" type="date" placeholder="选择日期" v-model="register.birthdate" style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>

      </el-form-item>
      <el-form-item class="bd" label="身份证号">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" v-model="register.idNumber"></el-input>
      </el-form-item>
      <el-form-item class="bd" label="家庭住址">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" v-model="register.address"></el-input>
      </el-form-item>
      <el-form-item class="bd" label="挂号日期">

        <!-- el-date-picker对应h5中input type="date" -->
        <el-date-picker class="txt" type="date" placeholder="选择日期" v-model="register.visitDate" style="width: 100%;"
          value-format="yyyy-MM-dd"></el-date-picker>

      </el-form-item>
      <el-form-item class="bd" label="挂号级别">
        <!-- el-select：H5里select -->
        <el-select class="txt" v-model="register.registerLevelId" placeholder="请选择挂号级别"
          @change="selectLevel(register.registerLevelId)">
          <!-- <el-option label="专家" value="expert"></el-option> -->
          <el-option v-for="level in levellist" :key="level.id" :label="level.registName" :value="level.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="bd" label="挂号科室">
        <!-- el-select：H5里select -->
        <el-select class="txt" v-model="register.deptId" placeholder="请选择科室" @change="selectDept()">

          <el-option v-for="dept in deptlist" :key="dept.id" :label="dept.deptName" :value="dept.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="bd" label="看诊医生">
        <!-- el-select：H5里select -->
        <el-select class="txt" v-model="register.userId" placeholder="请选择医生" @change="listDoctor()">

          <el-option v-for="user in userlist" :key="user.userId" :label="user.realName" :value="user.userId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="bd" label="病例本">
        <el-radio-group class="txt" v-model="register.isBook">
          <el-radio :label="1">需要</el-radio>
          <el-radio :label="0">不需要</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="bd" label="总金额">
        <!-- el-input:原生H5的input标签 -->
        <el-input class="txt" v-bind:value="total"></el-input>
      </el-form-item>

      <el-form-item class="bd">
        <el-button type="primary" @click="onSubmit">挂号</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'GuaHaoGL',
    data: function() {
      return {
        register: {
          caseNumber: '',
          realName: '',
          gender: '',
          age: '',
          birthdate: '',
          idNumber: '',
          address: '',
          registerLevelId: '',
          deptId: '',
          userId: '',
          visitDate: '',
          cost: '',
          isBook: '',
          operatorId: sessionStorage.getItem('userId')
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
        levellist: [],
        deptlist: [],
        userlist: []
      }
    },
    methods: {
      // 提交挂号信息
      onSubmit: function() {
        let that = this;
        this.$axios.post('RegisterController/addRegister', this.$qs.stringify(this.register))
          .then(resp => {
            if (resp.status == 200) {
              let result = resp.data;
              if (result > 0) {
                alert('挂号成功');
              } else {
                alert('挂号失败');
              }
              this.$router.go(0);
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
      findMaxCaseNumber: function() {
        let that = this;
        // 最大病例号
        this.$axios.get('RegisterController/findMaxCaseNumber')
          .then(resp => {
            if (resp.status == 200) {
              that.register.caseNumber = resp.data;
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
      listLevel: function() {
        let that = this;
        this.$axios.get('RegistLevelController/listLevel')
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.levellist = responseBean.data;
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
      listDept: function() {
        let that = this;
        this.$axios.get('DeptController/listDept')
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.deptlist = responseBean.data;
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
            }

          );
      },
      listDoctor: function() {
        let that = this;
        this.$axios.get('UserController/listDoctor', {
            params: {
              registerLevelId: that.register.registerLevelId,
              deptId: that.register.deptId

            }
          })
          .then(resp => {
            if (resp.status == 200) {
              let responseBean = resp.data;
              that.userlist = responseBean.data;
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
      selectDept: function() {
        this.listDoctor();
      }

    },
    // 利用vue生命周期函数在页面载入时获得新的病例号
    created: function() {
      // 获取最大病例号
      this.findMaxCaseNumber();
      // 获取挂号级别列表
      this.listLevel();
      // 获取挂号科室的列表
      this.listDept();
    },
    computed: {
      total: function() {
        if (this.register.isBook) {
          return 8;
        } else {
          return 5;
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .txt {
    /* border: 1px solid red; */
    /* width: 300px; */
    width: 500px;
  }

  .bd {
    /* border: 1px solid black; */
    /* width: 400px; */
    width: 500px;
  }

  .form {
    /* width: 800px; */
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
