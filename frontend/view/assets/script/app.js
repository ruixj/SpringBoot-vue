/**
 * Created by yuzhou on 16/9/5.
 */

define(['vue', 'text!tpl/app.html'], function (Vue, appHtml) {

    return Vue.extend({
        template: appHtml,
        data: function(){
            return {
                user: ''
            }
        },
        ready: function(){
            this.user = this.$cookie.get('killPhone')
        }
    })
})
