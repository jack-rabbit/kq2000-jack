
<template>
    <div class="layout">
        <Layout style="height:100%">
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <div class="logo"><img src="../assets/images/login_logo.png" alt=""></div>
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="md-list" />
                            设备配置
                        </template>
                        <MenuItem name="1-1" to="/home/config">配置信息</MenuItem>
                        <MenuItem name="1-2" to="/home/log">日志管理</MenuItem>
                    </Submenu>
                    <MenuItem name="2" class="font-18" to="/home/attend">
                        <Icon type="md-podium" />
                        <span>考勤数据</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
                    <p class="loginout"><router-link  to="/"><Icon type="md-power" />退出登录</router-link></p>
                </Header>
                <Content :style="{margin: '20px',  minHeight: '220px'}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import https from '../https'
    export default {
        name:"home",
        data () {
            return {
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height:100%;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    
    .logo{
        width: 100%;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #364DAD;
    }
    .logo img{
        width: 76%;
        
    }
    .loginout{
        text-align: right;
        font-size:16px;
        color: #5472EA;
        
    }
    .loginout .ivu-icon{
        margin-right: 10px;
    }
</style>