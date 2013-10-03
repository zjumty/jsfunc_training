var fooAlias = foo;

function foo(arg1, arg2){
    return true;
}

var bar = function(arg1, arg2){
    return true;
};

TestCase("function scope test", {
    "test function scope" : function(){
        assertEquals("function", typeof foo);
        assertEquals("function", typeof window.foo);
        assertEquals("function", typeof fooAlias);
        assertEquals("foo", foo.name);
        assertEquals("foo", fooAlias.name);
        assertTrue(fooAlias === foo);

        assertEquals("function", typeof bar);
        assertEquals("", bar.name);
    }
});