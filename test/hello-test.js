TestCase("HelloTest", {
    testHello: function () {
        var arr = [1, 2, 3, 4, 5];
        var arr2 = _.filter(arr, function(n){return n % 2 === 0});
        assertEquals(2, arr2.length);
    }
});
