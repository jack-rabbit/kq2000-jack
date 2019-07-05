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
                <p><Cascader :data="data4" :load-data="loadData" style="width:200px" size="small"></Cascader></p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>4G号码：</p> 
               <p>4G运营商：</p>
            </Col>
            <Col span="20" class="right">
                <p><Input type="number" size="small" style="width:200px;" v-model="tel" element-id="tel" @on-keyup="checkLength"/></p>
                <p>
                    <Select  style="width:200px">
                        <Option value="中国移动">中国移动</Option>
                        <Option value="中国联通">中国联通</Option>
                        <Option value="中国电信">中国电信</Option>
                    </Select>
                </p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>自有云服务器地址：</p> 
               <p>云平台地址：</p>
            </Col>
            <Col span="20" class="right">
                <p><Button size="small">启用</Button></p>
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
                <p>
                    <Select style="width:200px">
                        <Option value="60">60W</Option>
                        <Option value="80">80W</Option>
                        <Option value="120">120W</Option>
                    </Select>
                </p>
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
        <Button type="primary" class="edit_btn" to="/home/config">保存</Button>
    </div>
</template>
<script>
export default {
    name:'config',
    data () {
            return {
                tel:'',
                data4: [
                    {
                        value: 'china',
                        label: '中国',
                        children: [],
                        loading: false
                    },
                    {
                        value: 'american',
                        label: '美国',
                        children: [],
                        loading:false
                    }
                ]
            }
        },
        methods: {
            
            loadData (item, callback) {
                item.loading = true;
                setTimeout(() => {
                    if (item.value === 'china') {
                        item.children = [
                            {
                                value: 'hunan',
                                label: '湖南'
                            },
                            {
                                value: 'hubei',
                                label: '湖北'
                            },
                            {
                                value: 'jiangxi',
                                label: '江西'
                            }
                        ];
                    } else if (item.value === 'american') {
                        item.children = [
                            {
                                value: 'houston',
                                label: '休斯顿'
                            },
                            {
                                value: 'NYC',
                                label: '纽约'
                            }
                        ];
                    }
                    item.loading = false;
                    callback();
                }, 1000);
            },
            checkLength(){
                //const _this = ev.find("input");
                 let tel = document.getElementById('tel').value;
                 if(tel.length>1){
                     this.tel=tel.slice(0,11);
                 }
                
            }
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

