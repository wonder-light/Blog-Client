import { setStoreConfig, setUser } from "@/assets/js/api";
import axios from "@/assets/js/axios";

import env from "@/assets/js/env";
import '../../interface';
import '../css/tailwind.css';


//配置插件
export default {
    install: (app) => {
        app.config.warnHandler = warnCaptured;
        app.config.errorHandler = errorCaptured;
        app.config.globalProperties.env = env;
        app.config.globalProperties.axios = axios;
        app.config.globalProperties.$http = axios;
        
        setStoreConfig();
        
        if (env.isDev) {
            //设置此项为 true 可以在浏览器开发工具的“性能/时间线”页中启用对组件初始化、编译、渲染和修补的性能表现追踪
            app.config.performance = true;
        }
        
        window.onmessage = receiveMessage;
    }
};

//用于为应用内传递的未捕获的错误指定一个全局处理函数
function errorCaptured(err, instance, info) {
    //网络连接错误
    if (err.code === 'ERR_NETWORK') {
        if (env.isDev) {
            console.log('网络连接错误', err, instance, info);
        }
        //跳转404页面
        //instance.$router.push({ name: 'error' });
    }
}

//警告处理器将接受警告信息作为其第一个参数，来源组件实例为第二个参数，以及组件追踪字符串作为第三个参数
function warnCaptured(err, instance, info) {
    if (env.isDev) {
        console.log(err, instance, info);
    }
}


//接收从'https://blogadmin.nianian.cn'发送过来的数据
function receiveMessage(event) {
    const origin = env.isDev ? 'http://localhost' : 'https://blogadmin.nianian.cn';
    if (event.origin !== origin) return;
    if (event.data.key === import.meta.env.VITE_Key) {
        setUser(event.data.user);
    }
}