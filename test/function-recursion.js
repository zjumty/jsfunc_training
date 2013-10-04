TestCase("function recursion", {
    "test function rescursion": function () {
        var calculator = {
            /**
             * 阶乘
             * @param n
             * @returns {number}
             */
            factorial: function (n) {
                return n > 0 ? n * this.factorial(n - 1) : 1;
            }
        };

        assertEquals(120, calculator.factorial(5));

        var calculator2 = {
            factorial: calculator.factorial
        };

        calculator.factorial = null;

        assertEquals(120, calculator2.factorial(5));

    },

    "test function recursion 2": function () {
        var calculator = {
            factorial: function (n) {
                return n > 0 ? n * this.factorial(n - 1) : 1;
            }
        };

        var calculator2 = {
            // 换个名字
            factorial2: calculator.factorial
        };

        assertEquals(120, calculator2.factorial2(5));

        calculator.factorial = null;

        assertEquals(120, calculator2.factorial2(5));
    },

    "test function recursion 3": function () {
        var calculator = {
            // inline named function
            factorial: function fact(n) {
                return n > 0 ? n * fact(n - 1) : 1;
            }
        };

        var calculator2 = {
            factorial2: calculator.factorial
        };

        assertEquals(120, calculator2.factorial2(5));

        calculator.factorial = null;

        assertEquals(120, calculator2.factorial2(5));
    },

    "test function recursion 4": function () {
        var calculator = {
            // 使用arguments.callee解决
            // 注意：callee属性在未来的浏览器中可能不再支持。
            factorial: function (n) {
                return n > 0 ? n * arguments.callee(n - 1) : 1;
            }
        };

        var calculator2 = {
            factorial2: calculator.factorial
        };

        assertEquals(120, calculator2.factorial2(5));

        calculator.factorial = null;

        assertEquals(120, calculator2.factorial2(5));
    }
});
