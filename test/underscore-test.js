TestCase("underscore test", {
    "test each/forEach": function () {
        var list = [1, 2, 3];
        _.each(list, alert);

        var obj = {one: 1, two: 2, three: 3};
        _.each(obj, alert);
    },

    "test map/collect": function () {
        // 通过变换函数（iterator迭代器）把list中的每个值映射到一个新的数组中（产生一个新的数组）
        var list = [1, 2, 3];
        var list2 = _.map(list, function (it) {
            return it * 2
        });
        assertEquals(2, list2[0]);
        assertEquals(4, list2[1]);
        assertEquals(6, list2[2]);
    },

    "test reduce/foldl/inject": function () {
        // list中元素归结为一个单独的数值。
        var list = [1, 2, 3];
        var result = _.reduce(list, function (memo, num) {
            return memo + num
        }, 0);
        assertEquals(6, result);

        // 从右向左归结
        var str = _.reduceRight(list, function (memo, num) {
            return memo + "" + num;
        }, "");
        assertEquals("321", str);
    },

    "test find/detect": function () {
        //  如果找到匹配的元素，函数将立即返回，不会遍历整个list
        var list = [1, 2, 3];
        var result = _.find(list, function (n) {
            return n % 2 === 0;
        });
        assertEquals(2, result);
    },

    "test filter/select": function () {
        var list = [1, 2, 3];
        var result = _.filter(list, function (n) {
            return n % 2 === 1;
        });
        assertEquals(1, result[0]);
        assertEquals(3, result[1]);
    },

    "test where": function () {
        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        var result = _.where(list, {gender: "m"});
        assertEquals("Terry", result[0].name);
        assertEquals("Ivan", result[1].name);
        assertEquals("Dre", result[2].name);

        var result2 = _.findWhere(list, {gender: "m"});
        assertEquals("Terry", result2.name);
    },

    "test reject": function () {
        // 和filter相反

        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        var result = _.reject(list, function (p) {
            return p.gender === "m"
        });

        assertEquals("Zoe", result[0].name);
    },

    "test every/all": function () {
        // 如果list中的所有元素都通过iterator的真值检测就返回true
        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        var result = _.every(list, function (p) {
            return p.gender === "m"
        });

        assertFalse(result);
    },

    "test some": function () {
        // 如果list中有任何一个元素通过 iterator 的真值检测就返回true。
        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        var result = _.some(list, function (p) {
            return p.gender === "f"
        });

        assertTrue(result);
    },

    "test contains": function () {
        // 是否包含
        assertTrue(_.contains([1, 2, 3], 2));
    },

    "test invoke": function () {
        // 在list的每个元素上执行指定方法

        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        _.each(list, function (p) {
            p.say = function () {
                return this.name + " is " + this.gender
            }
        });

        // 其实可以用each/map来代替，用起来方便一些
        var results = _.invoke(list, "say");
        assertEquals("Terry is m", results[0]);
    },

    "test pluck": function () {
        var list = [
            {name: "Terry", gender: "m"},
            {name: "Ivan", gender: "m"},
            {name: "Zoe", gender: "f"},
            {name: "Dre", gender: "m"}
        ];

        // 萃取对象数组中某属性值，返回一个数组。
        var results = _.pluck(list, "name");
        assertEquals("Terry", results[0]);
        assertEquals("Dre", results[3]);
    },

    "test max/min": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];

        var max = _.max(list, function (p) {
            return p.age;
        });
        assertEquals("Zoe", max.name);

        var min = _.min(list, function (p) {
            return p.age;
        });
        assertEquals("Ivan", min.name);
    },

    "test sortBy": function () {
        // 返回一个排序后的list拷贝副本
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];

        var results = _.sortBy(list, "age");
        assertEquals("Ivan", results[0].name);
        assertEquals("Terry", list[0].name);
    },

    "test groupBy": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];

        var results = _.groupBy(list, "gender");
        assertEquals(3, results["m"].length);
        assertEquals(1, results["f"].length);
    },

    "test indexBy": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];

        var results = _.indexBy(list, "name");
        assertEquals(10, results["Terry"].age);
        assertEquals(16, results["Dre"].age);
    },

    "test countBy": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];

        var results = _.countBy(list, "gender");
        assertEquals(3, results["m"]);
        assertEquals(1, results["f"]);
    },

    "test shuffle": function () {
        var list = [1, 2, 3, 4, 5, 6];
        var results = _.shuffle(list);
        console.log(results);
    },

    "test sample": function () {
        var list = [1, 2, 3, 4, 5, 6];
        var results = _.sample(list, 2);
        console.log(results);
    },

    "test size": function () {
        var obj = {a: 1, b: 2, c: 3};
        assertEquals(3, _.size(obj));
    },

    "test chain/value1": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 8}
        ];

        // SELECT name, age FROM T WHERE age > 5 ORDER BY age

        // => {
        //     "m":[
        //         {name: "Dre", gender: "m"},
        //         {name: "Terry", gender: "m"}
        //     ],
        //     "f":{name: "Zoe", gender: "f"}
        // }
        var results = _.chain(list)
            .select(function(p){ return p.age > 5})
            .sortBy("age")
            .collect(function(p){return _.pick(p, "name", "gender")})
            .groupBy("gender")
            .value();

        console.log(results);
        assertEquals(2, results["m"].length);
        assertEquals(1, results["f"].length);
        assertEquals("Dre", results["m"][0].name);
        assertEquals("Terry", results["m"][1].name);
        assertEquals("Zoe", results["f"][0].name);
    },

    "test chain/value2": function () {
        var list = [
            {name: "Terry", gender: "m", age: 10},
            {name: "Ivan", gender: "m", age: 5},
            {name: "Zoe", gender: "f", age: 30},
            {name: "Dre", gender: "m", age: 16}
        ];
        // => {"m":"Ivan,Terry, Dre", "f":"Zoe"}
        var results = _.chain(list)
            .sortBy("age")
            .groupBy("gender")
            .map(function (value, key) {
                var obj = {};
                obj[key] = _.chain(value)
                    .pluck("name")
                    .reduce(function (memo, obj) {
                        return memo + "," + obj
                    })
                    .value();
                return obj;
            })
            .reduce(_.extend)
            .value();

        console.log(results);
        assertEquals("Ivan,Terry,Dre", results["m"]);
        assertEquals("Zoe", results["f"]);
    }

});