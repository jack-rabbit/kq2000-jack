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
                    <span>2019年06月27日   17：08</span>
                </Col>
            </Row>
        </div>
        <div class="table_box">
            <Row class="search">
                <Col span="12" class="left">
                   <CheckboxGroup v-model="type" @on-change="refresh">
                        <Checkbox label="in">进门： <span class="bold">{{inNum}}</span></Checkbox>
                        <Checkbox label="out">出门： <span class="bold">{{outNum}}</span></Checkbox>
                        <Checkbox label="stay">无效数据（逗留/折返）： <span class="bold">--</span></Checkbox>
                    </CheckboxGroup>
                </Col>
                <Col span="12" class="right">
                    <Input type="text" v-model="rfid" size="small" placeholder="输入RFID" style="width:150px;"></Input>
                    <DatePicker :value="dateArray" size="small" :options="option" format="yyyy/MM/dd" @on-change="setValue" type="date" placement="bottom-start" placeholder="选择日期" style="width:150px;" ></DatePicker>
                    <Button type="primary" class="search_btn" size="small">查询</Button>
                </Col>
            </Row>
            <Table stripe :loading="loading" :no-data-text="nodata"  :columns="columns1" :data="data1"></Table>    
            <page :count="count" :limit="limit" :curr="curr" @pagechanged="jump"></page>
        </div>
    </div>
</template>
<script>
import page from '../base/page'

export default {
    name:"attend",
    data(){
        return{
            //基站状态
            station:0,
            padNum:0,
            verson:'1.9.1',

            //分页
            count:123,
            curr:1,
            limit:10,

            //考勤类型
            type:['in','out'],
            inNum:123,
            outNum:120,
            rfid:"",
            dateArray:"",
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
                        title: '进门/出门/逗留/折返',
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
    created(){
        this.dateArray = new Date();
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
                    cardId:"SN12345",
                    level:"60%",
                    type:"进门"
                }
            }

            this.data1=temp;
            this.loading=false;
        },
        refresh(){
            console.log(this.type);
            this.inNum=12;
            this.outNum=32;
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
</style>


