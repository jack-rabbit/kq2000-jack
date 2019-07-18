<template>
    <div class="attend">
        <div class="status">
            <Row>
                <Col span="16" class="left">
                    基站状态：<span style="margin-right:60px;" v-if="station==0">未连接</span>
                    <span style="color:#5472EA;margin-right:60px;" v-else>已连接</span>
                    收到键盘总数：<span style="margin-right:60px;">{{padNum}}</span>
                    版本号：<span> {{verson}}</span>
                </Col>
                <Col span="8" class="right">
                    <!-- <span>2019年06月27日   17：08</span> -->
                    <!-- <Button type="primary" size="small" @click="refresh">刷新</Button> -->
                    <Button type="primary" size="small" :loading="loading2" @click="refresh">
                        <span v-if="!loading2">刷新</span>
                        <span v-else>Loading...</span>
                    </Button>
                </Col>
            </Row>
        </div>
        <div class="table_box">
            <Row class="search">
                <Col span="12" class="left">
                   <CheckboxGroup v-model="type" >
                        <Checkbox label="1">进门： <span class="bold">{{inNum}}</span></Checkbox>
                        <Checkbox label="2">出门： <span class="bold">{{outNum}}</span></Checkbox>
                        <Checkbox label="0,3,4,5">无效数据（逗留、折返等）： <span class="bold">{{state3}}</span></Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col span="12" class="right">
                    <Input type="text" v-model="rfid" size="small" placeholder="输入RFID" style="width:100px;"></Input>
                    <DatePicker :value="dateArray" size="small" :options="option" format="yyyy-MM-dd" @on-change="setValue" type="daterange" placement="bottom-start" placeholder="选择日期" style="width:200px;" ></DatePicker>
                    <!-- <DatePicker :value="dateArray" :options="option" format="yyyy-MM-dd" @on-change="setValue" type="daterange" placement="bottom-start" placeholder="选择日期" ></DatePicker> -->
                    <Button type="primary" class="search_btn" size="small" @click="search">查询</Button>
                </Col>
            </Row>
            <p class="export_btn">
                <Button type="primary" size="small" @click="ExcelExporter">导出Excel</Button>
            </p>
            <Table stripe :loading="loading" :no-data-text="nodata"  :columns="columns1" :data="data1"></Table>    
            <page :count="count" :limit="limit" :curr="curr" @pagechanged="jump"></page>
        </div>
    </div>
</template>
<script>
import page from '../base/page'
import https from '../../https'
import Tool from '../../assets/js/base'

export default {
    name:"attend",
    data(){
        return{
            //基站状态
            station:sessionStorage.getItem("device_state"),
            padNum:sessionStorage.getItem("key_num"),
            verson:sessionStorage.getItem("device_version"),
            loading2:false,

            //分页
            count:0,
            curr:1,
            limit:10,

            //考勤类型
            type:['1','2'],
            inNum:0,
            outNum:0,
            rfid:"",
            dateArray:[],
            option:{
                disabledDate (date) {
                    //const disabledDay = date.getDate();
                    const nowDate=new Date();
                    return date > nowDate;
                }
            },

            //表格
            loading:false,
            nodata:"暂无数据",
            columns1: [
                    {
                        title: '序号',
                        key: 'sn'
                    },
                    {
                        title: '卡号',
                        key: 'cardId'
                    },
                    {
                        title: '进门/出门/无效数据',
                        key: 'type'
                    },
                    {
                        title: '电量等级',
                        key: 'level'
                    },
                    {
                        title: '考勤时间',
                        key: 'date'
                    }
                ],
            data1:[]
        }
    },
    computed:{
        state3(){
            return this.count-this.inNum-this.outNum;
        }
    },
    created(){
        

        //this.httpData(this.curr);

        this.loading=true;

        //const start =new Date();
        //start.setTime(start.getTime() - 3600 * 1000 * 24)
        this.dateArray[0]= Tool.formatDate(new Date());
        this.dateArray[1]=Tool.formatDate(new Date());

        //this.dateArray = Tool.formatDate(new Date());
        //this.jump(this.curr);
        const param = {
            deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
            state:this.type.toString(),
            //creat_time: this.dateArray 
            start_time:this.dateArray[0],
            end_time:this.dateArray[1]   
        }
        this.httpData(param);
        this.getNum(param);
        
    },
    methods:{
        jump(curr){
            this.loading = true;
            this.curr = curr;
            const param = {
                deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                //creat_time:this.dateArray, 
                start_time:this.dateArray[0],
                end_time:this.dateArray[1],
                showcount:this.limit,
                currentpage:this.curr,
                state:this.type.toString(),
            }
            this.httpData(param);
            this.getNum(param);
        },
        getNum(param){
            https.fetchPost(this.basePath+'/getDeviceState',param).then((data)=>{
                this.inNum=data.data.data.state1==null?0:data.data.data.state1;
                this.outNum=data.data.data.state2==null?0:data.data.data.state2;
            }).catch((err)=>{
                console.log(err);
            })
        },
         httpData(param){
            https.fetchPost(this.basePath+'/testRecord',param).then((data)=>{
            if(data.data.status>0){
                let res = data.data.data.list;
                const arry=[];
                for (let i = 0; i < res.length; i++) {
                    arry[i]={};
                    arry[i].sn = res[i].recordId;
                    arry[i].date = res[i].createTime;
                    arry[i].cardId = res[i].cardNumber;
                    arry[i].level = res[i].electricQuantity;

                    switch(res[i].state){
                        case '0' : arry[i].type = "未知";break;
                        case '1' : arry[i].type = "进门";break;
                        case '2' : arry[i].type = "出门";break;
                        case '3' : arry[i].type = "逗留";break;
                        case '4' : arry[i].type = "折返";break;
                        case '5' : arry[i].type = "进入读卡区域";break;
                    }
                    //arry[i].type = res[i].state
                    
                }  
                this.count = data.data.data.total;
                this.curr = data.data.data.pageNum+1;
                this.limit = data.data.data.pageSize;
                this.data1 = arry;
                this.loading=false;
            }else{
                this.data1 = [];
                this.count = 0;
                this.curr = 1;
                this.limit = 10;
                this.loading=false;
            }

        }).catch((err)=>{
            console.log(err);
            this.data1 = [];
            this.count = 0;
            this.curr = 1;
            this.limit = 10;
            this.loading=false;
            //this.$Message.error(err);
        })
        },
        search(){
            const param = {
                deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                //creat_time:this.dateArray, 
                start_time:this.dateArray[0],
                end_time:this.dateArray[1],
                showcount:this.limit,
                //currentpage:this.curr,
                cardnum:this.rfid,
                state:this.type.toString(),
            }
            this.httpData(param);
            this.getNum(param);
        },
        refresh(){
            this.loading2 = true;
            const params={
                userId:this.$store.state.userId==0?sessionStorage.getItem("user_id"):this.$store.state.userId,
            }
            https.fetchPost(this.basePath+'/getDevice',params ).then((data) => {

                        const res = data.data.data.device[0];
                        this.$store.dispatch("setDeviceId",res.deviceId);
                        this.$store.dispatch("setDeviceState",res.stateOnline);
                        this.$store.dispatch("setDeviceVersion",res.currentVersion);
                        this.$store.dispatch("setKeyNum",res.attendance);
                    
                        this.station=res.stateOnline;
                        this.padNum=res.attendance;
                        this.verson=res.currentVersion;
                        this.loading2=false;

                        
                }).catch(err=>{
                        console.log(err)
                    }
                )
            
        },
        setValue(date){
            this.dateArray=date;
        },
        ExcelExporter(){
            window.open(this.basePath+"/exportrecord?deviceid="+sessionStorage.getItem("device_id")+"&state="+this.type.toString()+"&start_time="+this.dateArray[0]+"&end_time="+this.dateArray[1]+"&cardnum="+this.rfid,"_blank");
        }
    },
    components:{
        page
    }
}
</script>
<style scoped>
    .attend{
        min-height: 100%;
    }
    .status{
        width: 100%;
        box-sizing: border-box;
        padding: 0 30px;
        height:50px;
        line-height: 50px;
        background: #fff;
        margin-bottom:30px;
    }
    .table_box{
        background: #fff;
        padding:30px;
    }
    .left{
        text-align: left;
    }
    .right{
        text-align: right;
    }
    .search{
        margin-bottom: 40px;
    }
    .bold{
        font-size: 16px;
        font-weight: bolder;
    }
    .export_btn{
        text-align: left;
        margin-bottom:10px;
    }
</style>


