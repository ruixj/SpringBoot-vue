/**
 * Created by yuzhou on 16/9/5.
 */

define(['vue', 'text!tpl/userapp.html'], function (Vue, appHtml) {

    return Vue.extend({
        template: appHtml,
        data: function(){
            return {
                user: ''
            }
        },
        ready: function(){
            this.user = '13810581299'
        }
    })
})
