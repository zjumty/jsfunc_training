TestCase("HelloTest", {
    setUp: function () {

    },

    tearDown: function () {

    },

    testUnderscoreFilter: function () {
        var arr = [1, 2, 3, 4, 5];
        var arr2 = _.filter(arr, function(n){return n % 2 === 0});
        assertEquals(2, arr2.length);
    },

    "test jQuery selector by id and class" : function(){
        /*:DOC += <div id="foo"><span class="bar"></span></div> */
        var foo = $("#foo");
        assertNotNull(foo);
        assertEquals(1, foo.find("span").length);
        var bar = $(".bar");
        assertNotNull(bar);
        assertEquals("SPAN", bar.get(0).tagName);
    }

});

AsyncTestCase("HelloAsyncTest", {
    "test asynchronous operation" : function(queue){
        /*:DOC += <div id="foo"><span class="bar"></span><button id="btn1">BTN1</button><button id="btn2">BTN2</button></div> */

        AsyncModule.initialize();

        queue.call("someone click button1 after 2 seconds", function(callbacks){
            var myCallback = callbacks.add(function(){
                $("#btn1").click();
            });
            setTimeout(myCallback, 2000);
        });

        queue.call("someone click button2 after 1 seconds", function(callbacks){
            var myCallback = callbacks.add(function(){
                $("#btn2").click();
            });
            setTimeout(myCallback, 1000);
        });

        queue.call("check the span text", function(){
            assertEquals("helloworld", AsyncModule.getText());
        });
    }

});
