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
