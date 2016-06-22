/**
 * Created by flyjennyetn on 2016/1/30.
 */
avalon.directive("foo", {
    init: function (binding) {
        var elem = binding.element
        var vmodels = binding.vmodels
        var remove = avalon(elem).bind("click", function () {
            elem.innerHTML = new Date - 0
            for (var i = 0, v; v = vmodels[i++]; ) {
                if (v.hasOwnProperty(binding.expr)) {
                    v[binding.expr] = elem.innerHTML
                    break
                }
            }

        })
        binding.roolback = function () {
            avalon(elem).unbind("click", remove)
        }
    },
    update: function (value, oldValue) {
        this.element.innerHTML = value
    }
})