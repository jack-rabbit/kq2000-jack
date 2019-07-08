<template>
<div class="login">
<div class="top"></div>
    <div class="logo">
      <img src="../../assets/images/login_logo.png" alt="">
    </div>
    <div class="login_box">
      <p class="title">
        <span class="yun">云服务平台</span>
        <span class="shu">|</span>
        <span class="kq">KQ200D</span>
      </p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" autocomplete="off" class="myForm" >
        <FormItem prop="user">
          <Input type="text" placeholder="Username" class="hideInput" />
          <Input type="password" placeholder="Password" class="hideInput" />
          <Input prefix="ios-person" v-model="formInline.user" placeholder="请输入用户名" size="large" />
        </FormItem>
        <FormItem prop="password">
          <Input type="password" prefix="md-lock" v-model="formInline.password" placeholder="请输入密码" />
        </FormItem>
        <FormItem prop="radio" class="radio">
          <Checkbox lable="true" v-model="formInline.radio">阅读并同意 <a href="#" target="_blank">《中天电子云服务平台服务隐私协议》</a> </Checkbox>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
        </FormItem>
      </Form>
    </div>
    </div>
</template>
<script>
import https from '../../https';
    export default {
        name:"loginBox",
        data () {
            const validateRadio = (rule, value, callback) => {
                if (value === false) {
                     callback(new Error('请阅读并同意协议'));
                }else {
                     callback();
                }
            };
            return {
                formInline: {
                    user: '',
                    password: '',
                    radio:false,
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码长度至少6位', trigger: 'change' }
                    ],
                    radio:[
                         { validator:validateRadio, trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        //this.$Message.success('Success!');
                        let params = {
                            username : this.formInline.user,
                            password : this.formInline.password
                        };
                        // https.fetchGet('/api/login').then((data) => {
                        //     console.log(data);
                        // }).catch(err=>{
                        //     console.log(err)
                        // })
                        https.fetchPost('/api/login',params).then((data) => {
                            console.log(data);
                        }).catch(err=>{
                            console.log(err)
                        })
                        
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

<style scoped>
.login{
    height: 100%;
}
   .hideInput{
    opacity:0;
    position:absolute;
    top:0;
    height:0;
   }
   
   .logo img{
       width: 100%;
   }
   .login_box{
        width:660px;
        height:420px;
        background:rgba(255,255,255,1);
        box-shadow:0px 4px 9px 1px rgba(102,110,142,0.1);
        border-radius:4px;
        position:absolute;
        top:50%;
        left:50%;
        margin-top:-210px;
        margin-left:-330px;
   }
   .title{
       margin:50px auto;
   }
   .yun{
        font-size:30px;
        font-weight:bold;
        color:rgba(84,114,234,1);
        vertical-align: middle;
   }
   .shu{
       margin:0 11px;
   }
   .kq,.shu{
        font-size:20px;
        font-weight:400;
        color:rgba(51,51,51,1);
        vertical-align: middle;
   }
   .radio{
       text-align: left
   }
   .myForm{
       width: 360px;
       margin: 0 auto;
   }
   .top{
    height:46%;
    background:url(../../assets/images/login_bg.png) no-repeat;
    background-size:cover;
  }
  .logo{
       width: 26%;
       position: absolute;
       top:15%;
       left: 50%;
       margin-left: -13%;
   }

</style>