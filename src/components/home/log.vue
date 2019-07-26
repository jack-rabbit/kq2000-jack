<template>
    <div class="log">
        <Row class="search">
            <Col span="12" class="left">
                <DatePicker :value="dateArray" :options="option" format="yyyy-MM-dd" @on-change="setValue" type="daterange" placement="bottom-start" placeholder="选择日期" ></DatePicker>
                <Button type="primary" class="search_btn" @click="search">查询</Button>
            </Col>
            <Col span="12" class="right">
                <Button type="primary" @click="download">下载</Button>
            </Col>
        </Row>
        
        <Table stripe :loading="loading" :no-data-text="nodata"  :columns="columns1" :data="data1"></Table>       

        <!--自定义分页组件 count:数据总数  limit:单页数据数 curr：当前页 pagechange：自定义事件-->
        <page :count="count" :limit="limit" :curr="curr" @pagechanged="jump"></page>
    </div>
</template>
<script>
import page from '../base/page'
import https from '../../https'
import Tool from '../../assets/js/base'

export default {
    name:'log',
    created(){
        this.loading=true;
        const start =new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        this.dateArray[0]= Tool.formatDate(start);
        this.dateArray[1]=Tool.formatDate(new Date());
        //this.jump(this.curr);
        const param = {
            deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
            startTime:this.dateArray[0],
            endTime:this.dateArray[1]
        }
        this.httpData(param);
    },
    data(){
        return{
            loading:false,
            nodata:"暂无数据",
            dateArray:[],
            count:0,
            curr:1,
            limit:10,
            option:{
                disabledDate (date) {
                    //const disabledDay = date.getDate();
                    const nowDate=new Date();
                    return date > nowDate;
                }
            },
            columns1: [
                    {
                        title: '序号',
                        key: 'sn'
                    },
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '设备号',
                        key: 'deviceId'
                    },
                    {
                        title: '日志级别',
                        key: 'level'
                    },
                    {
                        title: '日志内容',
                        key: 'content'
                    }
                ],
            data1:[

            ]
        }
    },
    
    methods:{
        download(){
            const startTime = this.dateArray[0];
            const endTime = this.dateArray[1];
            window.open(this.basePath+"/exportLog?startTime="+startTime+"&endTime="+endTime,"_blank");
        },
        jump(curr){
            this.loading = true;
            this.curr = curr;
            const param = {
                deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                startTime:this.dateArray[0],
                endTime:this.dateArray[1],
                showcount:this.limit,
                currentpage:this.curr
            }
            this.httpData(param);

        },
        setValue(date){
            this.dateArray=date;
        },
        search(){
            const param = {
                deviceId:this.$store.state.deviceId==''?sessionStorage.getItem("device_id"):this.$store.state.deviceId,
                startTime:this.dateArray[0],
                endTime:this.dateArray[1],   
            }
             this.httpData(param);
        },
        httpData(param){
            https.fetchPost(this.basePath+'/log',param).then((data)=>{
                if(data.data.status>0){
                    let res = data.data.data.list;
                    const arry=[];
                    for (let i = 0; i < res.length; i++) {
                        arry[i]={};
                        arry[i].sn = res[i].logId;
                        arry[i].date = res[i].createTime;
                        arry[i].deviceId = res[i].deviceId;
                        arry[i].level = res[i].level;
                        arry[i].content = res[i].content
                        
                    }  
                    this.count = data.data.data.total;
                    this.curr = data.data.data.pageNum;
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
        }
        

        
        
    },
    components:{
        page
    }
}
</script>
<style scoped>
    .log{
       padding: 30px;
       min-height: 100%;
       background: #fff;
    }
    .search{
        margin-bottom: 30px;
        margin-top: 18px;
    }
    .left{
        text-align: left;
    }
    .right{
        text-align: right;
    }
    .search_btn{
        margin-left: 50px;
    }
    
</style>


