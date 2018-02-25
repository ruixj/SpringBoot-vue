/**
 * Created by yuzhou on 16/9/6.
 */

define(['vue'], function(Vue){
    return Vue.extend({
        template: '<span>{{ text }} : ' +
        '{{ Math.floor(time/60/60/24) }} 天 ' +
        '{{ Math.floor(time/60/60) % 24 }} 小时 ' +
        '{{ Math.floor(time/60) % 60 }} 分 ' + '{{ time % 60 }} 秒</span>',
        //'<button @click="plan">Click Me</button>',
        data: function(){
            return {
                timeId: 0
            }
        },
        watch: {
            'time': function (val, oldVal) {
                console.log('new: %s, old: %s', val, oldVal)
                // 如果值是由0 变成 >0的值，重新启动倒计时
                if(oldVal == 0 && val > 0){
                    this.reduceOne(true)
                }
            }
        },
        props: {
            text:{
                type: String,
                default: '倒计时'
            },
            time:{      //倒计时总时间
                type: Number,
                default: 0
            }
        },
        methods : {
            "plan":function() {
                console.log('dispatch an event : paln')
                this.$dispatch("plan");
            },
            reduceOne: function(start) {
                if(!start) this.time--;
                if(this.time > 0) {
                    this.timeId = setTimeout(this.reduceOne.bind(this), 1000);
                } else {
                    this.timeId = 0
                    this.plan()
                }
            }
        },
        activate: function (done) {
            console.log("activate countdown")
            done()
        },
        ready: function(){
            console.log("countdown is ready")
            if(this.time > 0){
                console.log('prepare to count down: ', this.time)
                this.reduceOne(true)
            }
        },
        attached: function(){
            console.log("countdown is attached")
        },
        detached: function(){
            console.log("countdown is detached")
        },
        destroyed: function(){
            console.log("countdown is destroyed")
            if(this.timeId != 0){
                console.log('clear timeout', this.timeId)
                clearTimeout(this.timeId)
            }
        }
    })
})