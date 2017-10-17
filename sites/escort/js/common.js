$(window).load(function() {
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");

	$(".navbar-nav>li:not(:last-child)").click(function(){
		!$(this).hasClass('active') && $(this).addClass('active').siblings('.active').removeClass('active');
	});

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('.header-top').fadeOut(100);
		} else {
			$('.header-top').fadeIn(100);
		}

	});

			
	if ($('.select-panel').length>0){
		var panel = $('.select-panel');
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				var panelFixedLength = $('.select-panel-fixed').length;
				(panelFixedLength==0) && panel.addClass('select-panel-fixed');
			} else {
				(panelFixedLength>0) && panel.removeClass('select-panel-fixed');
			}
		});
	}

});
