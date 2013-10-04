TestCase("funciton closure", {
    "test closure 1": function () {
        var $ = {};
        assertNotSame(jQuery, $);

        var module = (function ($) {
            assertSame(jQuery, $);
            // 是有变量， 外部访问不到
            var count = 0;

            return {
                increase: function () {
                    count++;
                },

                getCount: function () {
                    return count;
                }
            }
        })(jQuery);

        module.increase();
        assertEquals(1, module.getCount());
        assertUndefined(module.count);
    },

    "test closure 2": function () {
        var chars = ["a", "b", "c"];
        var funlist = [];
        for (var i = 0; i < chars.length; i++) {
            funlist.push(function () {
                return chars[i];
            });
        }

        // 所有的函数都返回undefined
        for (var j = 0; j < funlist.length; j++) {
            assertUndefined(funlist[j]());
        }
    },

    "test closure 3": function () {
        var chars = ["a", "b", "c"];
        var funlist = [];
        for (var i = 0; i < chars.length; i++) {
            funlist.push((function (idx) {
                return function () {
                    return chars[idx];
                };
            })(i));
        }

        // 所有的函数都返回undefined
        for (var j = 0; j < chars.length; j++) {
            assertEquals(chars[j], funlist[j]());
        }
    }

});
