function NSPagination(){



	var listElement = $('#newStuffPagination');
	var perPage = listElement.data('perpage');
	var numItems = listElement.children().size();
	var numPages = Math.ceil(numItems/perPage);

	$('.pager').data("curr",0);

	var curr = 0;
	while(numPages > curr){
	  $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo('.pager');
	  curr++;
	}

	$('.pager .page_link:first').addClass('active');

	listElement.children().css('display', 'none');
	listElement.children().slice(0, perPage).css('display', 'block');

	$('.pager li a').click(function(){
	  var clickedPage = $(this).html().valueOf() - 1;
	  goTo(clickedPage,perPage);
	});

	function previous(){
	  var goToPage = parseInt($('.pager').data("curr")) - 1;
	  if($('.active').prev('.page_link').length==true){
	    goTo(goToPage);
	  }
	}

	function next(){
	  goToPage = parseInt($('.pager').data("curr")) + 1;
	  if($('.active_page').next('.page_link').length==true){
	    goTo(goToPage);
	  }
	}

	function goTo(page){
	  var startAt = page * perPage,
	    endOn = startAt + perPage;
	  
	  listElement.children().css('display','none').slice(startAt, endOn).css('display','block');
	  $('.pager').attr("curr",page);
	  $('.active').removeClass('active');
	  $('.pager>li:nth-child(' + (page + 1) + ')>a').addClass('active');
	}
}



$(document).ready(function(){
	$.fn.datepicker.dates['ru'] = {
		days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
		daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
		daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
		months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		today: "Сегодня"
	};

    var dateInputs=$('input.date-input');
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
     dateInputs.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
        language: 'ru'
    })

	NSPagination();

	$('[data-toggle="popover"]').popover();
	$("#lightSliderSimple").lightSlider({
		item: 1,
		pager: true,
		controls: false
	});
	$("#lightSliderGallery").lightSlider({
	    gallery:true,
	    item:1,
	    thumbItem:3,
		onSliderLoad: function() {
		    $("#lightSliderGallery").removeClass('cS-hidden');
		}  
	});
	$("#lightSliderRow4Col").lightSlider({
		item: 4,
		pager: false,
		responsive : [
		    {
		        breakpoint:800,
		        settings: {
		            item:2
		          }
		    },
		    {
		        breakpoint:480,
		        settings: {
		            item:1
		          }
		    }
		]
	});
	$("#lightSliderRow3Col").lightSlider({
		item: 3,
		pager: false,
		responsive : [
		    {
		        breakpoint:800,
		        settings: {
		            item:2
		          }
		    },
		    {
		        breakpoint:480,
		        settings: {
		            item:1
		          }
		    }
		]
	});

	$("#lightSliderAboutUsGallery").lightSlider({
		gallery:true,
		item:1,
		thumbItem:8,
		thumbMargin:5,
		slideMargin:5
	});
});

