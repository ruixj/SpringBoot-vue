 /**
 * reuqire js 入口模块
 * Created by yuzhou on 16/9/5.
 */

var requireConfig = {
    baseUrl:'view/assets/script',
    paths: {
        'text': '../lib/text/text',
        'vue': '../lib/vue/dist/vue.min',
        'vue-router': '../lib/vue-router/dist/vue-router',
        'vue-resource': '../lib/vue-resource/dist/vue-resource',
        'vue-strap': '../lib/vue-strap/dist/vue-strap.min'
    },
    shim: {
    },
    map: {
    }
}

require.config(requireConfig)
require(['vue', 'vue-router', 'vue-resource', 'plugin/vue-cookie', 'userappcomp'], function (Vue, VueRouter, VueResource, VueCookie, App) {
    Vue.config.debug = true
    Vue.config.devtools = true

    Vue.use(VueCookie)

    // 配置自定义过滤器
    Vue.filter('localDateString', function(value) {
        return new Date(value).toLocaleString()
    })

    // 配置resouce访问
    Vue.use(VueResource)
    Vue.http.options.root = "http://localhost:8080/seckill"

    // 配置路由
    Vue.use(VueRouter)
    var Root = Vue.extend({})
    var router = new VueRouter({
                       mode: 'history' 
                 })
 
    router.map({
        '/': {
            component: function(resolve) {
                require(['userappcomp'], function(user){
                    resolve(user)
                })
            },
            name: 'user' 
        } 
    })
    router.start(Root, 'body')
    window.router = router
})
