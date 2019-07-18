import Vue from 'vue'
import "babel-polyfill"
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        userId:0,
        deviceId:"",
        deviceState:"",
        version:"",
        keyNum:0
        
        // count:1
    },
    getters:{

    },
    mutations:{
        editUserId(state,n){
            state.userId=n;
            sessionStorage.setItem("user_id",state.userId)

        },
        editDeviceId(state,n){
            state.deviceId=n
            sessionStorage.setItem("device_id",state.deviceId)
        },
        editDeviceState(state,n){
            state.deviceState=n
            sessionStorage.setItem("device_state",state.deviceState)
        },
        editDeviceVersion(state,n){
            state.version=n
            sessionStorage.setItem("device_version",state.version)
        },
        editKeyNum(state,n){
            state.keyNum=n
            sessionStorage.setItem("key_num",state.keyNum)
        }
        // add(state){
        //     state.count=state.count+1
        // },
        // reduction(state,n){
        //     state.count=state.count-n
        // }
    },
    actions:{
        setUserId(context,n){
            context.commit("editUserId",n);
        },
        setDeviceId(context,n){
            context.commit("editDeviceId",n);
        },
        setDeviceState(context,n){
            context.commit("editDeviceState",n);
        },
        setKeyNum(context,n){
            context.commit("editKeyNum",n);
        },
        setDeviceVersion(context,n){
            context.commit("editDeviceVersion",n);
        }
        // addFun(context){
        //     context.commit("add");
        // },
        // reductionFun(context,n){
        //     context.commit("reduction",n)
        // }

    }
})

export default store