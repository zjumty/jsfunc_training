var func1Alias = func1;

function func1(arg1, arg2){
    return true;
}

var func2 = function(arg1, arg2){
    return true;
};

var func4 = function func3(arg1, arg2){
    return true;
};

TestCase("function scope test", {
    "test function scope" : function(){
        assertEquals("function", typeof func1);
        assertEquals("function", typeof window.func1);
        assertEquals("function", typeof func1Alias);
        assertEquals("func1", func1.name);
        assertEquals("func1", func1Alias.name);
        assertTrue(func1Alias === func1);

        assertEquals("function", typeof func2);

        // 把function符给其他变量名不影响name属性
        assertEquals("", func2.name);
        assertEquals("func3", func4.name);
    }
});