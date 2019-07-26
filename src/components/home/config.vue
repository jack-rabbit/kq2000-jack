<template>
    <div class="config">
        <p class="btn">
            <Button v-if="flag=='edit'" type="primary" @click="reboot" size="small" ghost>重启设备</Button>
            <Button v-if="flag=='edit'" type="primary" @click="reset" size="small" ghost>恢复出厂设置</Button>
        </p>
        <Row>
            <Col span="4" class="left">
               <p>{{ $t('product_model') }}</p> 
               <p>设备ID：</p>
               <p>连接状态：</p>
               <p>IP地址：</p>
               <p>设备位置：</p>
            </Col>
            <Col span="20" class="right">
                <p>{{deviceType}}</p>
                <p>{{deviceId}}</p>
                <p>
                    <span style="margin-right:60px;" v-if="state_online==0">未连接</span>
                    <span style="color:#5472EA;margin-right:60px;" v-else>已连接</span>
                </p>
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
                    <Input v-model="addrDetail" type="textarea" :rows="2" :maxlength="18" style="width:400px;margin-top:5px;" placeholder="详细地址" />
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
               <p v-if="cloud_server!=0||serverFlag">密钥：</p>
               <p v-if="cloud_server!=0||serverFlag">向量：</p>
               <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)">&nbsp;</p>
               <p>云平台地址：</p>
            </Col>
            <Col span="20" class="right">
                <p v-if="flag=='info'">{{cloud_server==0?'关闭':cloud_server}}</p>
                <p v-if="flag=='info'&&cloud_server!=0">{{keylen}}</p>
                <p v-if="flag=='info'&&cloud_server!=0">{{vector}}</p>
                <p v-if="flag=='edit'"><Button v-if="!serverFlag&&cloud_server==0" type="default" size="small" @click="open">启用</Button><Input v-if="cloud_server!=0||serverFlag" v-model="cloud_server" size="small" style="width:200px;"/></p> 
                <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)"><Input v-model="keylen" size="small" style="width:200px;"/> <Button type="default" size="small" @click="cloudKeylen">随机生成</Button></p>
                <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)"><Input  v-model="vector" size="small" style="width:200px;"/> <Button type="default" size="small" @click="cloudVector">随机生成</Button></p> 
                 <p v-if="flag=='edit'&&(cloud_server!=0||serverFlag)"><Button type="default" size="small" @click="close">关闭</Button></p> 
                <p>{{cloud_server_path}}</p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>信号频率：</p>
               <p>联网方式：</p> 
               <p>信号功率：</p>
               <p v-if="flag=='edit'">调试设置：</p>
               <p v-if="flag=='edit'"></p>
               <p v-if="flag=='edit'"></p>
               <p v-if="flag=='edit'"></p>
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
                <p v-if="flag=='edit'">最后接收结果定断时长<InputNumber  :min="1" size="small" v-model="result_duration" style="margin-left:0.2em;"></InputNumber>（单位：秒）</p>
                <p v-if="flag=='edit'">逗留判定时长<InputNumber :min="1" size="small" v-model="stay_duration" style="margin-left:4.9em;"></InputNumber>（单位：秒）</p>
                <p v-if="flag=='edit'">第一次读头判断基数
                    <Select  style="width:80px;margin-left:1.0em" size="small" v-model="frist_read_base">
                        <Option value="3">3</Option>
                        <Option value="5">5</Option>
                        <Option value="7">7</Option>
                    </Select></p>
                <p v-if="flag=='edit'">判断最后保留读头次数
                    <Select  style="width:80px" size="small" v-model="last_read_base">
                        <Option value="5">5</Option>
                        <Option value="7">7</Option>
                        <Option value="9">9</Option>
                    </Select>
                </p>
            </Col>
        </Row>

        <Row class="marginTop">
            <Col span="4" class="left">
               <p>首次配置时间：</p> 
               <p>最近配置修改：</p>
               <p>版本号：</p>
               <p></p>
               <p></p>
               
            </Col>
            <Col span="20" class="right">
                <p>{{create_time}}</p>
                <p>{{modify_time}}</p>
                <p>
                    KQ200D-M程序版本 {{m_version}} 
                    <Button size="small" v-if="flag=='edit'" class="updata_btn" v-bind:disabled="(!flagm)||(state_online==0)" @click="upgrad('kq200dm',kq200dmPath,kq200dmMd5,kq200dmNewVersion)">点击升级</Button> 
                    <span v-if="(flag=='edit')&&(!flagm)">暂无升级</span>
                    <a :href="kq200dmPath==null?'javascript:;':basePath+'/file/download?filename='+kq200dmPath"  v-if="flag=='info'" target="_blank" class="targeta">下载到本地</a>
                </p>
                <p>
                    KQ200D-D程序版本 {{d_version}} 
                    <Button size="small" v-if="flag=='edit'" class="updata_btn" v-bind:disabled="(!flagd)||(state_online==0)" @click="upgrad('kq200dd',kq200ddPath,kq200ddMd5,kq200ddNewVersion)">点击升级</Button> 
                    <span v-if="(flag=='edit')&&(!flagd)">暂无升级</span>
                    <a :href="kq200ddPath==null?'javascript:;':basePath+'/file/download?filename='+kq200ddPath" v-if="flag=='info'" target="_blank" class="targeta">下载到本地</a>
                </p>
                <p>
                    KQ200D-固件版本 {{f_version}} 
                    <Button size="small" v-if="flag=='edit'" class="updata_btn" v-bind:disabled="(!flagf)||(state_online==0)" @click="upgrad('kq200df',kq200dfPath,kq200dfMd5,kq200dfNewVersion)">点击升级</Button> 
                    <span v-if="(flag=='edit')&&(!flagf)">暂无升级</span>
                    <a :href="kq200dfPath==null?'javascript:;':basePath+'/file/download?filename='+kq200dfPath" v-if="flag=='info'" target="_blank" class="targeta">下载到本地</a>
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
import Tool from '../../assets/js/base'


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

            result_duration:"",
            stay_duration:"",
            frist_read_base:"",
            last_read_base:"",

            create_time:"",
            modify_time:"",
            current_version:"",
            m_version:"",
            d_version:"",
            f_version:"",
            state_online:"",

            keylen:"",
            vector:"",

            kq200ddPath:"",
            kq200dfPath:"",
            kq200dmPath:"",

            kq200ddMd5:"",
            kq200dfMd5:"",
            kq200dmMd5:"",

            kq200ddNewVersion:"",
            kq200dfNewVersion:"",
            kq200dmNewVersion:"",

            flagm:false,
            flagd:false,
            flagf:false

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
                        this.result_duration="30",
                        this.stay_duration="120",
                        this.frist_read_base="3",
                        this.last_read_base="5",
                        this.edit();

                    },
                    onCancel: () => {
                        //this.$Message.info('Clicked cancel');
                    }
                });
        },
        reboot(){
            this.$Modal.confirm({
                title: '',
                content: '<p>确认重启设备吗？</p>',
                onOk: () => {
                    const param = {
                        device_id:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                    }
                    https.fetchPost(this.basePath+"/getDevice/reboot",param).then((res)=>{
                        console.log(res);
                        if(res.data.status=="200"){
                            this.$Notice.success({
                                title: res.data.msgContent,
                                desc: '指令生效大概需要3分钟，请耐心等待',
                                
                            });
                        }else{
                            this.$Notice.error({
                                title: res.data.msgContent,
                                desc: '请稍后再试',
                                
                            });
                        }
                    }).catch((error)=>{
                        if (error.response) {
                                // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                                console.log(error.response.data);
                                //this.$Message.error(error.response.data.msgContent);
                                this.$Notice.error({
                                    title: error.response.data.msgContent,
                                    desc: '请稍后再试',
                                    
                                });
                                console.log(error.response.status);
                                console.log(error.response.headers);
                                } else {
                                // Something happened in setting up the request that triggered an Error
                                console.log('Error', error.message);
                                }
                        
                    })
                },
                onCancel: () => {
                    //this.$Message.info('Clicked cancel');
                }
            });
        },
        open(){
            this.serverFlag=true;
        },
        close(){
            this.cloud_server=0;
            this.keylen='';
            this.vector='';
            this.serverFlag=false;
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

            this.flagd=Tool.compare(this.kq200ddNewVersion,this.kq200dd);
            this.flagm=Tool.compare(this.kq200dmNewVersion,this.kq200dm);
            this.flagf=Tool.compare(this.kq200dfNewVersion,this.kq200df);
        },
        cloudKeylen(){   
            this.keylen = Tool.uuid32();
        },
        cloudVector(){
            this.vector = Tool.vector9();
        },
        save(){
            if(this.addrDetail.length>18||this.addrDetail.length<4){
                this.$Message.error("详细地址长度不为4-18位字符串！");
                return false
            }
            if(this.cloud_server!=0&&(this.keylen.length!=32)){
                this.$Message.error("密钥长度不为32位字符串！");
                return false
            }
            if(this.cloud_server!=0&&(this.vector.length!=8||window.isNaN(this.vector))){
                this.$Message.error("向量内容不合法！");
                return false
            }
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
                //data_type:this.data_type,
                vector:this.vector,
                keylen:this.keylen,

                result_duration:this.result_duration,
                stay_duration:this.stay_duration,
                frist_read_base:this.frist_read_base,
                last_read_base:this.last_read_base,

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
                        this.$store.dispatch("setDeviceVersion",res.kq200df);
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
                        this.vector=res.cloudVector;
                        this.keylen = res.cloudPassword;
                        this.cloud_server_path=res.cloudServerPath;

                        this.signal_frequency=res.signalFrequency;
                        this.networking = res.networking;
                        this.signal_power=res.signalPower;

                        this.result_duration=res.resultDuration,
                        this.stay_duration=res.stayDuration,
                        this.frist_read_base=res.fristReadBase,
                        this.last_read_base=res.lastReadBase,

                        this.create_time=res.createTime;
                        this.modify_time=res.modifyTime;
                        this.current_version=res.currentVersion;
                        this.m_version=res.kq200dm;
                        this.d_version=res.kq200dd;
                        this.f_version=res.kq200df;
                        this.state_online=res.stateOnline;

                        this.kq200ddPath=data.data.data.deviceTypes[0].kq200ddPath;
                        this.kq200dfPath=data.data.data.deviceTypes[0].kq200dfPath;
                        this.kq200dmPath=data.data.data.deviceTypes[0].kq200dmPath;

                        this.kq200ddMd5=data.data.data.deviceTypes[0].kq200ddMd5;
                        this.kq200dfMd5=data.data.data.deviceTypes[0].kq200dfMd5;
                        this.kq200dmMd5=data.data.data.deviceTypes[0].kq200dmMd5;

                        this.kq200ddNewVersion=data.data.data.deviceTypes[0].kq200dd;
                        this.kq200dfNewVersion=data.data.data.deviceTypes[0].kq200df;
                        this.kq200dmNewVersion=data.data.data.deviceTypes[0].kq200dm;

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
        upgrad(program,Path,md5,version){
            
            const param = {
                device_id:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                program:program,
                md5:md5,
                filename:Path,
                version:version,
            } 

            https.fetchPost(this.basePath+"/getDevice/upgrade",param).then((res)=>{
                if(res.data.status=="200"){
                    this.$Notice.success({
                        title: res.data.msgContent,
                        desc: '指令生效大概需要3分钟，请耐心等待',
                        
                    });
                }else{
                    this.$Notice.error({
                        title: res.data.msgContent,
                        desc: '请稍后再试',
                        
                    });
                }
            }).catch((error)=>{
                if (error.response) {
                        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                        console.log(error.response.data);
                        //this.$Message.error(error.response.data.msgContent);
                        this.$Notice.error({
                            title: error.response.data.msgContent,
                            desc: '请稍后再试',
                            
                        });
                        console.log(error.response.status);
                        console.log(error.response.headers);
                        } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        }
                
            })

        }
       
                
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
    .targeta{
        color:#999999;
        text-decoration: underline;
    }
    .targeta:hover,.targeta:active{
        color:#5472EA
    }
    .updata_btn{
        margin:0 10px;
    }
</style>

