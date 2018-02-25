/**
 * Created by yuzhou on 16/9/5.
 */
define(['vue'], function (Vue) {

    return {
        exposer: function(seckillId){
            return Vue.http.get('seckill/exposer/'+ seckillId)
                .then(function(response){
                    return response.json()
                }).then(function(json){
                    if(json.success) {
                        return json.data
                    } else {
                        alert(json.error)
                        return null
                    }
                })
        },
        all: function () {
            return Vue.http.get('seckill')
                .then(function (response) {
                    return (response.json())
                }).then(function (json) {
                    if (json.success) {
                        return json.data
                    } else {
                        alert(json.error)
                        return []
                    }
                })
        },
        get: function (seckillId) {
            return Vue.http.get('seckill/' + seckillId)
                .then(function (response) {
                    return (response.json())
                }).then(function (json) {
                    if (json.success) {
                        return json.data
                    } else {
                        alert(json.error)
                        return {}
                    }
                })
        },
        now: function () {
            return Vue.http.get('time/now')
                .then(function (response) {
                    return (response.json())
                }).then(function(json){
                    if(json.success){
                        return json.data
                    } else {
                        alert(json.error)
                        return null
                    }
                })
        },
        exec: function(seckillId, md5){
            return Vue.http.post('seckill/execute/' + seckillId + '-' + md5, {})
                .then(function (response) {
                    return (response.json())
                }).then(function(json){
                    if(json.success){
                        return json.data
                    } else {
                        if(json.error){
                            alert(json.error)
                            return null
                        } else {
                            return json.data
                        }
                    }
                })
        }
    }
})