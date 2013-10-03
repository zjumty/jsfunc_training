var AsyncModule = (function ($) {
    var $button1,
        $button2,
        $span;

    return {
        initialize: function () {
            $button1 = $("#btn1");
            $button2 = $("#btn2");

            $span = $(".bar");

            $button1.click(function () {
                $span.text($span.text() + "hello");
            });

            $button2.click(function () {
                $span.text($span.text() + "world");
            });
        },

        getText: function () {
            return $span.text();
        }
    }
})(jQuery);

var TDDSample = (function ($, _) {
    return {
        sigma: function (a, b) {
            var sum = 0,
                i = a;
            for (; i <= b; i++) {
                sum += i;
            }
            return sum;
        }
    }
})(jQuery, _);
