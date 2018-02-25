/**
 * Created by yuzhou on 16/9/5.
 */

define(['vue', 'text!tpl/seckill/detail.html', 'service/seckillService', 'service/utilService', 'common/countdown'],
    function (Vue, detailHtml, seckillService, utilService, Countdown) {
    return Vue.extend({
        template: detailHtml,
        data: function(){
            return {
                seckill: {},
                exposer: {
                    exposed: false,
                    now: new Date().getTime(),
                },
                buttonDisabled: false,
                result: null
            }
        },
        watch: {

        },
        computed: {
            'seckillSuccess': function(){
                return this.result && this.result.state == 1
            },
            showOver: function() {
                return !this.$loadingRouteData
                    && !this.exposer['exposed']
                    && (this.exposer.now > this.seckill.endTime)
            },
            showSeckill: function() {
                return !this.$loadingRouteData
                    && this.exposer['exposed']
                    && (this.exposer.now  <= this.seckill.endTime && this.exposer.now  >= this.seckill.startTime)
                    //&& !this.result
            },
            showCountdown: function() {
                return !this.$loadingRouteData
                    && !this.exposer['exposed']
                    && (this.exposer.now  < this.seckill.startTime)
            },
            leftTime: function(){
                var left = Math.floor((this.seckill.startTime - this.exposer.now )/1000) +1
                return left < 0? 0 : left
            }
        },
        components: {
            'countdown': Countdown
        },
        methods: {
            handleSeckill: function(){ //获取秒杀地址，控制显示逻辑
                var me = this
                seckillService.exposer(this.seckill.id).then(function(exposer){
                    /* 往后倒退 10s，检测如果本机时间比服务器时间走的快时，倒计时是否能够恢复
                    exposer.now = exposer.now - 10 * 1000
                    if(exposer.now < me.seckill.startTime) exposer.exposed = false*/
                    me.exposer = exposer
                })
            },
            execSeckill: function(){
                var me = this
                if(!this.buttonDisabled) {
                    this.buttonDisabled = true
                    seckillService.exec(this.exposer.seckillId, this.exposer.md5).then(function(execResult){
                        me.result = execResult
                    })
                    /* 测试秒杀成功
                    this.result = {
                        state: 1,
                        stateInfo: '秒杀成功'
                    }*/
                    /* 测试秒杀失败
                     this.result = {
                        state: -1,
                        stateInfo: '重复秒杀'
                     }*/
                }
            }
        },
        events:{
            plan: function(){
                //倒计时时间到，更新系统时间数据
                var me = this
                me.handleSeckill()
            }
        },
        route: {
            data: function (transition){
                var killPhone = this.$cookie.get('killPhone')
                if(!utilService.validatePhone(killPhone)) {
                    //alert('用户未登录')
                    this.$router.go('/login')
                    return
                }

                console.dir(transition.to.params.seckillId)
                return {
                    seckill: seckillService.get(transition.to.params.seckillId),
                    //nowTime: seckillService.now(),
                    exposer: seckillService.exposer(transition.to.params.seckillId)
                }
            }
        },
        ready: function(){
            console.log('detail is ready', this.seckill.startTime, this.exposer.now, this.$loadingRouteData)
        }
    })
})