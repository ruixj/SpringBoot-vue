
define(['vue', 'text!tpl/error.html'], function (Vue, errorHtml) {
    return Vue.extend({
        template: errorHtml
    })
})