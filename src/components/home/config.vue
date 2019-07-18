<template>
    <div class="config">
        <p class="btn">
            <Button v-if="flag=='edit'" type="primary" @click="reset" size="small">恢复出厂设置</Button>
        </p>
        <Row>
            <Col span="4" class="left">
               <p>产品型号：</p> 
               <p>设备ID：</p>
               <p>IP地址：</p>
               <p>设备位置：</p>
            </Col>
            <Col span="20" class="right">
                <p>{{deviceType}}</p>
                <p>{{deviceId}}</p>
                <p>{{IP}}</p>
                <p v-if="flag=='info'">{{addr}}</p>
                <p v-if="flag=='edit'">
                    <!-- <Cascader :data="data4" :load-data="loadData" change-on-select style="width:200px" v-model="addrVal" size="small"></Cascader> -->
                    <Select v-model="model1" style="width:100px" @on-open-change="getNext(0,0)" size="small">
                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model2" style="width:100px" @on-open-change="getNext(model1,1)" size="small">
                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model3" style="width:100px" @on-open-change="getNext(model2,2)" size="small">
                        <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Select v-model="model4" style="width:100px" @on-open-change="getNext(model3,3)" size="small">
                        <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <br>
                    <Input v-model="addrDetail" type="textarea" :rows="2" style="width:400px;margin-top:5px;" placeholder="详细地址" />
                </p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>4G号码：</p> 
               <p>4G运营商：</p>
               <p v-if="flag=='info'">话费余额：</p>    
            </Col>
            <Col span="20" class="right">
                <p v-if="flag=='info'">{{g4_no}}</p>
                <p v-if="flag=='edit'"><Input type="number" size="small" style="width:200px;" v-model="g4_no" element-id="tel" @on-keyup="checkLength"/></p>
                <p>{{g4_type}}</p>
                <!-- <p v-if="flag=='edit'">
                    <Select  style="width:200px" v-model="g4_type">
                        <Option value="中国移动">中国移动</Option>
                        <Option value="中国联通">中国联通</Option>
                        <Option value="中国电信">中国电信</Option>
                    </Select>
                </p> -->
                <p v-if="flag=='info'" v-bind:class="{red:billTemp<=30}">{{bill}} <!--<Button size="small" class="query">查询</Button>--></p> 
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>自有云服务器地址：</p> 
               <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)">&nbsp;</p>
               <p>云平台地址：</p>
            </Col>
            <Col span="20" class="right">
                <p v-if="flag=='info'">{{cloud_server==0?'关闭':cloud_server}}</p>
                <p v-if="flag=='edit'"><Button v-if="!serverFlag&&cloud_server==0" type="default" size="small" @click="open">启用</Button><Input v-if="cloud_server!=0||serverFlag" v-model="cloud_server" size="small" style="width:200px;"/></p> 
                <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)">
                    <Select  style="width:200px" v-model="data_type">
                        <Option value="0">JSON</Option>
                        <Option value="1">XML</Option>
                    </Select>
                </p>
                <p>{{cloud_server_path}}</p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>信号频率：</p>
               <p>联网方式：</p> 
               <p>信号功率：</p>
            </Col>
            <Col span="20" class="right">
                <p>{{signal_frequency}}</p>
                <p v-if="flag=='info'">{{network}}</p>
                <p v-if="flag=='edit'">
                    <RadioGroup v-model="networking">
                        <Radio label="1"><span>4G</span></Radio>
                        <Radio label="2"><span>网线</span></Radio>
                    </RadioGroup>
                </p>
                <p>{{signal_power}}db</p>
                
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
                <p>{{create_time}}</p>
                <p>{{modify_time}}</p>
                <p>{{current_version}}</p>
                <p>
                    <span style="margin-right:60px;" v-if="state_online==0">未连接</span>
                    <span style="color:#5472EA;margin-right:60px;" v-else>已连接</span>
                </p>
            </Col>
        </Row>
        <Button v-if="flag=='info'" type="primary" class="edit_btn" v-bind:disabled="state_online==0" @click="edit" >修改配置</Button>
        <Button v-if="flag=='edit'" type="primary" class="edit_btn" @click="save" >保存</Button>
        <Button v-if="flag=='edit'" type="primary" class="edit_btn" @click="cancel" >取消</Button>
    </div>


</template>
<script>
import https from '../../https'
import axios from 'axios'


export default {
    name:'config',
    data(){
        return{
            flag:"info",
            deviceType:"",
            deviceId:"",
            IP:"",
            model1:'1',
            model2:'',
            model3:'',
            model4:'',
            cityList1:[],
            cityList2:[],
            cityList3:[],
            cityList4:[],
            addr:"",
            addrDetail:"",

            serverFlag:false,
            data_type:0,

            g4_no:"",
            g4_type:"",
            bill:"",
            billTemp:"",

            cloud_server:"",
            cloud_server_path:"",

            signal_frequency:"",
            networking:"",
            signal_power:"",

            create_time:"",
            modify_time:"",
            current_version:"",
            state_online:"",
           

            //data4:[]

        }
    },
    computed:{
        network(){
            let temp = "";
            if(this.networking=="1"){
                temp = "4G";
            }else if(this.networking=="2"){
                temp = "网线";
            }else{
                temp = "未知";
            }
            return temp;
        }
    },
    created(){     
        this.getDevice();          
    },

    methods:{
        reset(){
            this.$Modal.confirm({
                    title: '',
                    content: '<p>确认恢复出厂设置吗？</p>',
                    onOk: () => {
                        //this.$Message.info('Clicked ok');
                        this.model1="1";
                        this.model2="14";
                        this.model3="197";
                        this.model4="1649";
                        this.addrDetail="";
                        this.g4_no="";
                        this.networking="1";
                        this.cloud_server=0;
                        this.edit();
                    },
                    onCancel: () => {
                        //this.$Message.info('Clicked cancel');
                    }
                });
        },
        open(){
            this.serverFlag=true;
        },
        cancel(){
            this.flag="info";
            this.serverFlag=false;
            this.getDevice();
        },
        edit(){
            this.flag="edit";
            this.getCity({pid:'0'},0)
            this.getCity({pid:this.model1},1)
            this.getCity({pid:this.model2},2)
            this.getCity({pid:this.model3},3)
        },
        save(){
            const  param={
                addr:this.addrDetail,
                country:this.model1,
                province:this.model2,
                city:this.model3,
                region:this.model4,
                device_id:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                signal_power:this.signal_power,
                g4no:this.g4_no,
                networking:this.networking,
                g4type:this.g4_type,
                cloudserver:this.cloud_server,
                data_type:this.data_type,


            }
            
            this.httpData(param);
            
        },
        addFun(){
            this.$store.dispatch("addFun")
        },
        reductionFun(){
            this.$store.dispatch("reductionFun",2)
        },
        checkLength(){
            //const _this = ev.find("input");
                let tel = document.getElementById('tel').value;
                if(tel.length>1){
                    this.tel=tel.slice(0,11);
                }
            
        },
        httpData(param){
            https.fetchPost(this.basePath+'/getDevice/save',param).then((data)=>{
            this.flag="info";
            this.serverFlag=false;
            this.getDevice()

        }).catch((err)=>{
            console.log(err);
        })
        },
        getDevice(){
            const params={
                userId:this.$store.state.userId==0?sessionStorage.getItem("user_id"):this.$store.state.userId,
            }
            
             var reg=new RegExp("(?=通用话费余额：).*?(?=元)");
             var reg2=new RegExp("(?=截止到).*?(?=，)");
            https.fetchPost(this.basePath+'/getDevice',params ).then((data) => {
                        const res = data.data.data.device[0];
                        this.$store.dispatch("setDeviceId",res.deviceId);
                        this.$store.dispatch("setDeviceState",res.stateOnline);
                        this.$store.dispatch("setDeviceVersion",res.currentVersion);
                        this.$store.dispatch("setKeyNum",res.attendance);
                    

                        this.deviceType=res.deviceType.toUpperCase();
                        this.deviceId=res.deviceId;
                        this.IP=res.ip;
                        this.model1= res.country;
                        this.model2=res.province;
                        this.model3=res.city;
                        this.model4=res.region;
                        this.addrDetail=res.address;
                        this.addr = data.data.data.addrAll;
                        this.data_type = res.dataType;


                        this.g4_no=res.g4No;
                        this.g4_type=res.g4Type;
                        this.bill=reg.exec(res.bill)==null?"余额获取需要时间，请耐心等待更新":reg.exec(res.bill).toString().replace("通用话费余额：","")+"元"+"（"+reg2.exec(res.bill).toString().replace("截止到","")+"）";
                        this.billTemp = reg.exec(res.bill).toString().replace("通用话费余额：","")==null?0:reg.exec(res.bill).toString().replace("通用话费余额：","");

                        this.cloud_server=res.cloudServer;
                        this.cloud_server_path=res.cloudServerPath;

                        this.signal_frequency=res.signalFrequency;
                        this.networking = res.networking;
                        this.signal_power=res.signalPower;

                        this.create_time=res.createTime;
                        this.modify_time=res.modifyTime;
                        this.current_version=res.currentVersion;
                        this.state_online=res.stateOnline==0?"断开":"正常";

                        console.log(reg.exec(res.bill).replace("通用话费余额：",""))

                        
                }).catch(err=>{
                        console.log(err)
                    }
                )
        },
        getCity(param,no){
            https.fetchGet(this.basePath+'/getcity',param).then((data)=>{
                const res = data.data.data;
                    var arry=[];
                    for(var i=0;i<res.length;i++){
                        arry[i]={};
                        arry[i].value=res[i].id+'',
                        arry[i].label=res[i].cityname
                    }
                    if(no==0){
                        this.cityList1=arry;  
                        //this.model1=this.model1==""?arry[0].value:this.model1;  
                    }else if(no==1){
                        this.cityList2=arry;
                        //this.model2=this.model2==""?arry[0].value:this.model2;  
                    }else if(no==2){
                        this.cityList3 = arry;
                        //this.model3=arry[0].value;  
                    }else if(no == 3){
                        this.cityList4=arry;
                       // this.model4=arry[0].value;  
                    }
            }).catch((err)=>{
                console.log(err);
                 this.$Message.error(err.toString());
            });
           
           
        },
        getNext(pid,no){
            var param={pid:pid}  
            this.getCity(param,no)
        },
       
                
            },
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
    .red{
        color:#f00
    }
    .config p{
        line-height: 30px;
        min-height: 30px;
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
    .btn{
        text-align: right;
    }
</style>

