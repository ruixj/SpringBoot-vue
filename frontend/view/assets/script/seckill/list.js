/**
 * Created by yuzhou on 16/9/5.
 */

define(['vue', 'text!tpl/seckill/list.html', 'service/seckillService'], function (Vue, listHtml, seckillService) {

    return Vue.extend({
        template: listHtml,
        data: function () {
            return {
                seckillList:[]
            }
        },
        ready: function(){
        },
        route: {
            data: function(transition){
                return {
                    seckillList: seckillService.all()
                }
            }
        },
        methods: {
            showDetail : function (seckill) {
                this.$router.go({
                    name: 'seckillDetail',
                    params: { seckillId: seckill.id }
                })
            }
        }
    })
})