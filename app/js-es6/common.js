$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");
});

$(e => {
	$(".fancybox").fancybox({
		beforeShow(){
			$("body").addClass("fancy-active")
		},
		afterClose(){
			$("body").removeClass("fancy-active")
		}
	});
})