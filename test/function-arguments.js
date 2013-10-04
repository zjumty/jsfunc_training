TestCase("function arguments test", {
    "test arguments": function () {
        var whatever = function (a, b) {
            // 通过parameter取值
            assertEquals(1, a);
            assertEquals(2, b);

            // 通过arguments取值
            assertEquals(4, arguments.length);

            assertEquals(1, arguments[0]);
            assertEquals(2, arguments[1]);
            assertEquals(3, arguments[2]);
            assertEquals(4, arguments[3]);

            // arguments不是数组
            assertTrue([1, 2, 3, 4] instanceof Array);
            assertFalse(arguments instanceof Array);
        };

        whatever(1, 2, 3, 4);
    },

    "test invoke function as a function": function () {
        function func1() {
            assertTrue(this === window);
        }

        var func2 = function () {
            assertTrue(this === window);
        };

        func1();
        func2();
    },

    "test inovke funciton as a method": function () {
        var whatever = function () {
            return this;
        };

        // 到底是作为function还是作为method，不是看这个函数怎么定义，
        // 而是看这个function有没有附加到对象上。
        var o = {};
        o.whatever = whatever;

        var o2 = {};
        o2.whatever = whatever;

        // whatever和o.whatever和o2.whatever是同一个东西
        assertTrue(whatever === o.whatever);
        assertTrue(whatever === o2.whatever);
        assertTrue(o.whatever === o2.whatever);

        // 调用方式的不同，this也不同
        assertTrue(whatever() === window);
        assertTrue(o.whatever() === o);
        assertTrue(o2.whatever() === o2);

        // 一个常见的错误
        var invoker = function (f) {
            return f();
        };

        // 这是怎么回事？ 不是o.whatever吗？
        assertTrue(invoker(o.whatever) === window);
    },

    "test invoke function as a constructor": function () {
        function Foo() {
            this.whatever = function () {
                return this
            };
        }

        Foo.prototype.someMethod = function () {
            return this
        };


        var foo1 = new Foo();
        var foo2 = new Foo();

        // this就是新创建的对象
        assertTrue(foo1.whatever() === foo1);
        assertTrue(foo2.whatever() === foo2);
        // 不同的对象的whatever方法不是同一个函数
        assertFalse(foo1.whatever === foo2.whatever);
        // 但通过prototype添加的方法是指向同一个函数的。
        assertTrue(foo1.someMethod === foo2.someMethod);
    },

    "test invoke via apply/call": function () {
        var sum = function () {
            var n = 0;
            for (var i = 0; i < arguments.length; i++) {
                n += arguments[i];
            }
            this.result = n;
        };

        var o1 = {},
            o2 = {};

        sum.apply(o1, [1, 2, 3, 4, 5]);
        assertEquals(15, o1.result);

        sum.call(o2, 1, 2, 3, 4);
        assertEquals(10, o2.result);
    },

    "test bind method": function () {

        var sum = function () {
            var n = 0;
            for (var i = 0; i < arguments.length; i++) {
                n += arguments[i];
            }
            this.result = n;
        };

        var o1 = {},
            o2 = {};

        // 把o1绑定为sum的function context
        // 注意：返回一个新的函数， 原始的sum并未发生变化。
        var sum2 = sum.bind(o1);

        sum2.apply(o2, [1, 2, 3, 4, 5]);
        assertTrue(undefined === o2.result);
        assertTrue(15 === o1.result);

        // 原始的sum函数并未发生变化
        sum.apply(o2, [1, 2, 3]);
        assertEquals(6, o2.result);

        // bind还可以绑定参数
        var add = function (a, b, c) {
            return a + b + c;
        };

        // 2+4+6
        assertEquals(12, add(2, 4, 6));

        var add2 = add.bind(undefined, 1);
        // 1+4+6
        assertEquals(11, add2(4, 6));

        var add3 = add2.bind(undefined, 3);
        // 1+3+6;
        assertEquals(10, add3(6));

    }

});
