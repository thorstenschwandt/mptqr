
(function ($) {
    $(document).ready(function () {
		$(".screen").page();
        $(".screen .page .navigate").click(function (ev) {
            var page  = $(ev.target).attr("data-page-name");
            var trans = $(ev.target).attr("data-page-trans");
            if ($(".screen").page().fetch(page) === null)
                $(".screen").page().shake();
            else
                $(".screen").page().transition(page, trans);
        });

		$('.cov').hide();
        
    });
	

})(jQuery);

