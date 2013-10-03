TestCase("function scope test2", {
    "test function scope 2" : function(){

        var a = func1();

        function func1(){
            return "1";
        }

        assertEquals("1", a);
    },

    "test function scope 3" : function(){

        var a = func1();

        var func1 = function(){
            return "1";
        };

        assertEquals("1", a);
    },

    "test function scope 4" : function(){

        var func1 = function(){
            return c;
        };

        var c = "1";

        var a = func1();

        assertEquals("1", a);
    }

});