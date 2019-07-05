<template>
    <div class="log">
        <Row class="search">
            <Col span="12" class="left">
                <DatePicker :value="dateArray" :options="option" format="yyyy/MM/dd" @on-change="setValue" type="daterange" placement="bottom-start" placeholder="选择日期" ></DatePicker>
                <Button type="primary" class="search_btn">查询</Button>
            </Col>
            <Col span="12" class="right">
                <Button type="primary" ghost>下载</Button>
            </Col>
        </Row>
        
        <Table stripe :loading="loading" :no-data-text="nodata"  :columns="columns1" :data="data1"></Table>       

        <!--自定义分页组件 count:数据总数  limit:单页数据数 curr：当前页 pagechange：自定义事件-->
        <page :count="count" :limit="limit" :curr="curr" @pagechanged="jump"></page>
    </div>
</template>
<script>
import page from '../base/page'

export default {
    name:'log',
    data(){
        return{
            loading:false,
            nodata:"暂无数据",
            dateArray:[],
            count:123,
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
                {
                    sn:1,
                    date:"2019-07-02 ",
                    deviceId:"SN12345",
                    level:"错误error",
                    content:"日志内容日志内容日志内容日志内容日志内容"
                },
                {
                    sn:2,
                    date:"2019-07-02 ",
                    deviceId:"SN12345",
                    level:"错误error",
                    content:"日志内容日志内容日志内容日志内容日志内容"
                }
            ]
        }
    },
    created(){
        const start =new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24)
        this.dateArray[0]= start;
        this.dateArray[1]=new Date();
        this.jump(this.curr);
    },
    methods:{
        
        jump(curr){
            const temp=[];
            const num = curr;
            this.loading = true;
            for(let i=(num-1)*this.limit;(i<this.count&&i<num*this.limit);i++){
                temp[i-(num-1)*this.limit]={
                    sn:i,
                    date:"2019-07-02 ",
                    deviceId:"SN12345",
                    level:"错误error",
                    content:"日志内容日志内容日志内容日志内容日志内容"
                }
            }

            this.data1=temp;
            this.loading=false;
        },
        setValue(date){
            this.dateArray=date;
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


