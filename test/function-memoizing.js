TestCase("self memoizing", {
    "test self memoizing": function () {
        function isPrime(value) {
            // 给isPrime函数添加一个answer属性作为缓存
            isPrime.answers = isPrime.answers || {};

            // 如果已经计算过了则直接把值返回
            if (isPrime.answers[value] != null) {
                return isPrime.answers[value];
            }

            // 如果没有计算过，计算完把结果保存在缓存中
            var prime = value != 1; // 1 can never be prime
            for (var i = 2; i < value; i++) {
                if (value % i == 0) {
                    prime = false;
                    break;
                }
            }
            return isPrime.answers[value] = prime;
        }

        assertTrue(isPrime(5));
        assertTrue(isPrime.answers[5])
    }
});
