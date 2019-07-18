<template>
    <Row class="page" v-if="pageNum != 0">
            <Col span="12" class="left">
                共 {{pageNum}} 页 当前第 {{currP}} 页
            </Col>
            <Col span="12" class="right">
               跳转至<Input size="small" v-model="currP" @on-enter="pageClick" style="width:48px;margin:0 10px;"/>页  
               <Button  @click="prev" size="small" style="margin-left:30px;">上一页</Button>
               <Button  @click="next" size="small">下一页</Button>
            </Col>
        </Row>
</template>
<script>
export default {
    name:'page',
    data(){
        return {
            countP:this.count,
            currP:this.curr,
            limitP:this.limit,
            //pageNum:Math.ceil(this.countP/this.limitP)

        }
    },
    props:{
        count:{
            type:Number,
            default:0
        },
        curr:{
            type:Number,
            default:1
        },
        limit:{
            type:Number,
            default:10
        }
    },
    computed: {
        pageNum: function () {
            return Math.ceil(this.count/this.limit)
        }
    },
    methods:{
        
        prev(){
            let temp = this.currP;
            temp -= 1;
            if(temp<=0){
                temp=1;
                this.currP=temp;
                this.$Message.info('前面没有啦');
                return;
            }
            this.currP=temp;    
            this.pageClick();
        },
        next(){
            let temp = this.currP;
            const pageNum = this.pageNum;
            temp += 1;
            if(temp>pageNum){
                temp = pageNum;
                this.currP=temp; 
                this.$Message.info('后面没有啦');
                return;
            }
            this.currP=temp;    

            this.pageClick();
        },
        pageClick(){
            this.$emit('pagechanged', this.currP)
        },
        
    }
    
}
</script>
<style scoped>
    .page{
        margin-top:50px;
    }
    .left{
        text-align: left;
    }
    .right{
        text-align: right;
    }
</style>


