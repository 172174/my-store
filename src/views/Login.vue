<template>
  <div>
    <el-card class="login-card">
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <div class="login-tital" style="text-align: center">
          <span>商城后台</span>
        </div>

        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginForm.username"
            placeholder="请输入用户名"
            auto-complete="on"
            style="width: 300px; float: left"
          >
            <span slot="prefix"><i class="el-icon-user"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            style="width: 300px; float: left"
          >
            <span slot="prefix"><i class="el-icon-lock"></i></span>
          </el-input>
        </el-form-item>

        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入验证码"
            style="width: 170px; float: left"
          >
            <span slot="prefix"><i class="el-icon-lock"></i></span>
          </el-input>
          <el-image :src="loginForm.codeImg" class="code-image" @click="changeCodeImg"></el-image>
        </el-form-item>
        <!-- <el-form-item  prop="checkPass">
          <el-input
            type="password"
            v-model="loginForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item> -->

        <el-form-item
          style="margin-right: 75px; text-align: center"
        >
          <el-button type="primary" @click="submitForm('loginForm')"
            >登录</el-button
          >
          <!-- <el-button @click="resetForm('loginForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import qs from "qs"
export default {
  name: "Login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "test2",
        password: "111111",
        code: "111",
        codeImg:null,
        key:''
      },
      rules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  created(){
    
      this.getImg()
  }
  ,
  methods: {
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
             
            this.$axios.post('/login'+'?'+qs.stringify(this.loginForm)).then(res=>{
              
                const jwt = res.data.data
                this.$store.commit('SET_TOKEN',jwt)
                
                this.$router.push("/")
            })
            this.changeCodeImg()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getImg(){
        this.$axios.get('/captcha').then(res=>{
            
            this.loginForm.key = res.data.data.key
            this.loginForm.codeImg = res.data.data.img
        })
    },
    changeCodeImg(){
      this.getImg()
      this.loginForm.code=''
    }
  },
};
</script>

<style scoped>
.demo-loginForm {
  position: relative;
}
.code-image{
    float:left;
    width:110px;
    margin-left:20px ;
    border-radius: 4px;
}
.login-tital {
  margin-bottom: 20px;
}
.login-card {
  position: absolute;
  left: 0;
  right: 0;
  margin: 140px auto;
  border-top: 10px solid #409eff;
  width: 500px;
  height: 300px;
}
</style>