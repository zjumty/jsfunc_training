TestCase("function overloading", {
    "test overloading 1": function () {
        var o = {
            // 永远不会被调用
            whatever: function (a) {
                return a;
            },

            whatever: function (a, b) {
                return a + b;
            }
        };

        assertEquals("aundefined", o.whatever("a"));
    },

    "test length of function": function () {
        var whatever1 = function (a) {
        };
        var whatever2 = function (a, b) {
        };

        // function的length属性是函数定义时的参数个数
        assertEquals(1, whatever1.length);
        assertEquals(2, whatever2.length);
    },

    "test overloading 2": function () {
        var o = {};
        addMethod(o, "whatever", function (a) {
            return a
        });
        addMethod(o, "whatever", function (a, b) {
            return a + b;
        });
        addMethod(o, "whatever", function (a, b, c) {
            return a + b + c;
        });
        assertEquals("a", o.whatever("a"));
        assertEquals("ab", o.whatever("a", "b"));
        assertEquals("abc", o.whatever("a", "b", "c"));

        assertEquals(undefined, o.whatever("a","b","c","d"));
    }
});