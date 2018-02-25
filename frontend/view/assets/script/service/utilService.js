/**
 * Created by yuzhou on 16/9/6.
 */
define({
    validatePhone: function(phone){
        return /^1\d{10}$/.test(phone)
    }
})