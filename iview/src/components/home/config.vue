<template>
    <div class="config">
        <Row>
            <Col span="4" class="left">
               <p>产品型号：</p> 
               <p>设备ID：</p>
               <p>IP地址：</p>
               <p>设备位置：</p>
            </Col>
            <Col span="20" class="right">
                <p>KQ200D</p>
                <p>SN12345</p>
                <p>102.13.217.111</p>
                <p>中国湖南省长沙市天心区九峰小学</p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>4G号码：</p> 
               <p>4G运营商：</p>
               <p>话费余额：</p>    
            </Col>
            <Col span="20" class="right">
                <p>18911118888</p>
                <p>中国电信</p>
                <p>¥ 120.00 <Button size="small" class="query">查询</Button></p> 
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>自有云服务器地址：</p> 
               <p>云平台地址：</p>
            </Col>
            <Col span="20" class="right">
                <p>关闭</p>
                <p>192.17.81.1</p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>信号频率：</p> 
               <p>信号功率：</p>
            </Col>
            <Col span="20" class="right">
                <p>2.4G  Hz</p>
                <p>120W</p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>首次配置时间：</p> 
               <p>最近配置修改：</p>
               <p>当前版本：</p>
               <p>连接状态：</p>
            </Col>
            <Col span="20" class="right">
                <p>2018.10.11  22：12</p>
                <p>2019.01.21  17：01</p>
                <p>1.9.1</p>
                <p>正常</p>
            </Col>
        </Row>
        <Button type="primary" class="edit_btn" to="/home/config-edit">修改配置</Button>
    </div>
</template>
<script>
import https from '../../https'


export default {
    name:'config',
    created(){
        
        https.fetchGet('/api/users' ).then((data) => {
                        console.log(data);
                        console.log(localStorage.getItem('token'));
                }).catch(err=>{
                        console.log(err)
                    }
                )
    },
    methods:{

    }

}
</script>

<style scoped>
    .config{
        min-height:100%;
        padding:30px;
        background:#fff;
        font-size:14px;
        text-align: left
    }
    .config p{
        line-height: 30px;
    }
    .left{
        text-align: left;
    }
    .right{
        text-align: left;
    }
    .marginTop{
        margin-top: 30px;
    }
    .query{
        margin-left: 10px;
        vertical-align: middle
    }
    .edit_btn{
        margin-top: 60px;
    }
</style>

