let updateTimeout;

$(window).on("load resize", e => {


	$(".catalog-slider, .cat-items").each((i, el) => {
		let $this = $(el),
			$imgs = $this.find(".cat-item__img"),
			$titles = $this.find(".cat-item__title");

		$imgs.height(getMaxHeight($imgs));

		$titles.height(getMaxHeight($titles));
	});

	$(".cart-aside__img").width(getMaxWidth($(".cart-aside__img")));

});

const getMaxHeight = $objects => {
	return Math.max(...$objects.map(function(){
		return $(this).height()
	}))
},
getMaxWidth = $objects => {
	return Math.max(...$objects.map(function(){
		return $(this).width()
	}))
};

// sergey new code-------------
$(document).ready(function(){
	loadScripts();
	// слайдер



	$(".to_top").click(e => {
		$("html, body").animate({
			scrollTop: 0,
		}, 400);

		return false
	});

	$(".color-select").each((i, el) => {
		new colorSelect({
			element: el,
		});
	});

	$(".manifest__one").click(function(){
		// $('.manifest__one-text').toggleClass("display", "none")
		let $this = $(this);
		$(this).toggleClass("open")
	});

	// // dropdown в мобильнои меню
	// $('.head__mobile_dropdown ul').click(function(){

	// 		var $this = $(this);
	// 		$('.head__mobile_dropdown ul').removeClass('sub_menu__open');
	// 		$this.addClass('sub_menu__open'); 
	// });

	// dropdown в мобильнои меню
	$('.head__mobile_dropdown ul').click(function(){

			var $this = $(this);
			$this.find("li").slideToggle(300) 
			$this.toggleClass('sub_menu__open'); 
			// $this.slideToggle(300) 
	});

	// открытие мобильного меню
	$('.burger').click(function(){
		mobileMenu.toggle();
	});

	$("body").click(e => {
		let $target = $(e.target);

		if (!$(".burger").is($target) 
			&& !$(".burger").has($target).length
			&& !$(".head__mobile_container").is($target)
			&& !$(".head__mobile_container").has($target).length)
			mobileMenu.close()
	});

	$(".card .card__slick").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".card__slick_slide",
		asNavFor: '.card__slick_nav',
	})
	$('.card .card__slick_nav').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		slide: ".card__slick_slide",
		asNavFor: '.card__slick',
		focusOnSelect: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 660,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 360,
				settings: {
					slidesToShow: 2
				}
			}
		]	
	});
	// табы
	$(".card__tabs_navi span").click(function(){
		let $this = $(this);
		let id = $this.attr("data-id");
		$('.card__tabs_navi span').removeClass('active')
		$(this).addClass('active')
		$('.card__tabs_left_content_flex').css("display", "none")
		$(".card__tabs_left_content_flex[data-id='"+id+"']").css("display", "flex")
	});
	// табы в форме
	$(".login-__form_tabs a").click(function(){
		let $this = $(this);
		let id = $this.attr("data-id");
		$('#popup-2 form').removeClass('active')
		$('.login-__form_tabs a').removeClass('active')
		$(this).addClass('active')
		$("#popup-2 form[data-id='"+id+"']").addClass('active')
	});
	// форма отзыва
	// появление
	$(".card__btn").click(function(){
		$('.card__feedback_middle').css("display", "none")
		$('.card__feedback_middle-no_feedback').css("display", "none")
		$('.card__feedback_bot').css("display", "none")
		$('.card__feedback_form').css("display", "block")
	});
	// закрытие
	$(".card__feedback_form-close").click(function(){
		$('.card__feedback_form').css("display", "none")
		$('.card__feedback_middle').css("display", "block")
		$('.card__feedback_middle-no_feedback').css("display", "block")
		$('.card__feedback_bot').css("display", "flex")
	});
	// убирает крестик формы при нажатии на него и очищает инпут
	$('.delivery-city_reset').click(function(){
		$('.delivery-city_reset').css("display", "none")
		$('#city').attr("value", "")
	});


	// скролл таблицы 
	$('.delivery-table').scroll(function(){
		var a = $('.delivery-table').scrollLeft();
		var window_w = (window.innerWidth);
		var x = (460 - window_w);
		// удаляет класс с тенью
		if (a >= x) {
			$('.delivery- .card__tabs_left').removeClass("shadow")
		}
		else{
			$('.delivery- .card__tabs_left').addClass("shadow")
		}

	});
});

// sergey new code------------ END
$(window).on("load", e => {
	$("body").removeClass("loading").addClass("loaded");
});


class headSearch{
	static openSearch(){
		$(".head__search-more").slideDown(300)

	}
	static closeSearch(){
		$(".head__search-more").slideUp(300)
	}
	static toggleSearch(){
		$(".head__search-more").slideToggle(300)
	}
}

class headSubmenu{
	static open(){
		$("body").addClass("js__submenu-opened");
		$(".head__submenu").addClass("js__opened");
		$(".head-title").addClass("js__active");
	}
	static close(){
		$("body").removeClass("js__submenu-opened");
		$(".head__submenu").removeClass("js__opened");
		$(".head-title").removeClass("js__active");
	}
	static toggle(){
		if ($("body").hasClass("js__submenu-opened"))
			headSubmenu.close()
		else
			headSubmenu.open()
	}
}

window.headSearch = headSearch;
window.headSubmenu = headSubmenu;

const loadScripts = e => {
	$(".fancybox").fancybox({
		beforeShow(){
			$("body").addClass("fancy-active")
		},
		afterClose(){
			$("body").removeClass("fancy-active")
		}
	});

	$(".fancybox_popup").fancybox({
		beforeShow(){
			$("body").addClass("fancy-active").addClass("fancy-popup")
		},
		afterClose(){
			$("body").removeClass("fancy-active").removeClass("fancy-popup")
		},
		afterShow(){
			$(".popup .card__slick").slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				slide: ".card__slick_slide",
				asNavFor: '.card__slick_nav',
			});

			$('.popup .card__slick_nav').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				slide: ".card__slick_slide",
				asNavFor: '.card__slick',
				focusOnSelect: true,
				arrows: false,
			});
		}
	});

	$(".search-button").click(e => {
		headSearch.toggleSearch();

		return false;
	});

	$(".search-close").click(e => {
		headSearch.closeSearch();
	});

	// $(".head-title").click(e => {
	// 	headSubmenu.toggle();
	// });

	let hoverTimeout;

	$(".head-title, .head-submenu").hover(e => {
		clearTimeout(hoverTimeout);

		headSubmenu.open();
	}, e => {
		hoverTimeout = setTimeout(e => {
			headSubmenu.close();
		}, 400)
	});

	$(".big-slider").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		slide: ".big-slider__slide",
		centerMode: true,
		centerPadding: 0,
		// arrows: false,
		appendArrows: $(".big-slider__arrows"),
		// variableWidth: true,
		responsive: [
				{
	         breakpoint: 1400,
	         settings: {
	           slidesToShow: 4
	         }
	       },
	       {
	         breakpoint: 1000,
	         settings: {
	           slidesToShow: 3
	         }
	       },
	       {
	         breakpoint: 600,
	         settings: {
	           slidesToShow: 1
	         }
	       },
	    ]
	}).on("setPosition", slick => {
		$(".big-slider__arrows").width($(".big-slider__slide:eq(0)").width())
	});
};

$(function() {
	if($(window).width() > 790) {
		$(".selectize").each((i, el) =>{
			let $this = $(el);

			$(".selectize").selectize();
		});
	};

	window.catSlider = new catalogSlider();

	window.subImg = new submenuImg(".head-submenu__column--img img");

	var asideClone = $('.catalog .aside').clone().addClass('js__catalog-filter');
	$('.catalog .title-block__title').append(asideClone);

	$(".main-slider").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		slide: ".main-slider__slide",
		dots: true,
		responsive: [
			{
				breakpoint: 660,
				settings: {
					arrows: false
				}
			}
		]
	});

	$('.catalog-filter select').find('option').each(function() {

		var $sort = $(this).attr('data-src');

        if($(this).prop('selected') == true){ 
          $(this).closest('.forms-input-cont.mobile').find('.ico-select-img').attr('src', $sort);
        }
    });

	$('.catalog-filter select').on('change', function(){

		var $this = $(this);




		$this.find('option').each(function() {

			var $sort = $(this).attr('data-src');

	        if($(this).prop('selected') == true){ 
	          $(this).closest('.forms-input-cont.mobile').find('.ico-select-img').attr('src', $sort);
	        }
	    });

	});

	$(".head-submenu__menu-link").hover(function(){
		let $this = $(this);

		subImg.src = $this.attr("data-img-src");
	});

	$("body").click(e => {
		let $target = $(e.target);

		if (!$target.is($(".head-title"))
			&& !$target.is($(".head-submenu"))
			&& !$(".head-submenu").has(e.target).length){
			headSubmenu.close();
		}	
	});


	$('.aside-title').click(function(){
		var $this = $(this);
		$this.closest('.js__catalog-filter').toggleClass('js__open');
	});


	if($(window).width() < 1000){
		$('.lacquer-category').click(function(){
			var $this = $(this);

			$this.find('.lacquer-category__list').slideToggle('slow');
		});
	}

	$('.cart-aside__mobile-btn').on('click', function() {
		$('html, body').animate({
			scrollTop: $('.cart-info .title-block__title').offset().top+"px"},
			300
		);
	});
});

class submenuImg{
	set $img(selector){
		this._img = document.querySelectorAll(selector)[0];
	}
	get $img(){
		return $(this._img)
	}
	set src(src){
		this._src = src;
		this.$img.attr("src", this._src);
	}
	get src(){
		return this._src
	}

	constructor(selector){
		this.$img = selector;

		this.getFirstImg();
	}

	getFirstImg(){
		let $activeLink = $(".head-submenu__menu-link.active");

		if (!$activeLink.length)
			this.src = $activeLink.attr("data-img-src")
		else
			this.src = $($(".head-submenu__menu-link")[0]).attr("data-img-src")
	}
}

class catalogSlider{
	set activeId(id){
		if (this._activeSliderId == id)
			return

		this._activeSliderId = id;

		this.changeSlider(id).changeTab(id);
	}

	constructor(){
		this.$sliders = $(".catalog-slider").slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			slide: ".catalog-slider__slide",
			// autoplay: true,
			autoplaySpeed: 4000,
			responsive: [
		       {
		         breakpoint: 1000,
		         settings: {
		           slidesToShow: 3,
		           dots: true,
		           arrows: false,
		         }
		       },
		       {
		         breakpoint: 700,
		         settings: {
	         		arrows: false,
	         		dots: true,
		           slidesToShow: 2
		         }
		       },
		       {
		         breakpoint: 370,
		         settings: {
		         	arrows: false,
		         	dots: true,
					slidesToShow: 1	
		         }
		       },
		    ]
		});

		if (!this.$sliders.length)
			return

		// $(".catalog-slider.active").slick("slickPlay");

		this.activeId = $(".catalog-slider.active").index();

		this.bindEvents()
	}
	changeSlider(newSliderId){
		$(".catalog-slider.active").slick("slickPause");
		$(".catalog-slider.active").removeClass("active");

		$(".catalog-slider:eq("+newSliderId+")").addClass("active")
			.slick("slickPlay");

		return this;		
	}
	changeTab(newSliderId){
		$(".tabs__one.active").removeClass("active");

		$(".tabs__one:eq("+newSliderId+")").addClass("active");

		return this;	
	}

	bindEvents(){
		let self = this;
		$(".tabs__one").click(function(){
			let $this = $(this);

			self.activeId = $this.attr("data-id");
		})
	}
}

class colorSelect{
	set $select(element){
		this._select = element
	}
	get $select(){
		return $(this._select)
	}

	set curVal(val){
		this._curVal = val;

		this.curImgSrc = this.$select.find("option[value='"+val+"']").attr("data-src");
		this.curItemText = this.$select.find("option[value='"+val+"']").text();
	}
	get curVal(){
		return this._curVal
	}

	constructor(settings = {}){
		this.$select = settings.element;

		this.curVal = this.$select.val();

		this.makeSelect();		

		
	}

	remakeSelect(){
		this.fakeSelect.remove();
		this.makeSelect();
	}

	getOptions(){
		this.options = "";

		this.$select.find("option").each((i, el) => {
			let $this = $(el);

			if ($this.attr("value") == this.curVal)
				return

			let val = $this.attr("value"),
				text = $this.text(),
				imgSrc = $this.attr("data-src");

			this.options +="<div class=\"fake-select__list-one forms__input forms__input--select\">\
				<div data-val=\""+val+"\" class=\"fake-select__item\">\
					<figure class=\"fake-select__item-img\">\
						<img src=\""+imgSrc+"\"/>\
					</figure>\
					<div class=\"fake-select__item-text\">"+text+"</div>\
				</div>\
			</div>";
		});
	}

	makeSelect(){

		this.getOptions();

		this.template = "<div class='fake-select'>\
			<div class=\"fake-select__current forms__input forms__input--select\">\
				<div data-val=\""+this.curVal+"\" class=\"fake-select__item\">\
					<figure class=\"fake-select__item-img\">\
						<img src=\""+this.curImgSrc+"\"/>\
					</figure>\
					<div class=\"fake-select__item-text\">"+this.curItemText+"</div>\
				</div>\
			</div>\
			<div class=\"fake-select__list\">"+this.options+"</div>\
		</div>";

		this.$select.after(this.template);

		this.fakeSelect = this.$select.next(".fake-select");

		this.hideSelect();

		this.bindEvents();
	}

	hideSelect(){
		this.$select.hide();
	}

	openSelect(){
		this.fakeSelect.addClass("js__opened")
	}

	closeSelect(){
		this.fakeSelect.removeClass("js__opened")
	}


	bindEvents(){
		let self = this,
			$select = this.$select,
			$fSelect = this.fakeSelect;

		$select.change(function(){
			self.curVal = $(this).val()
		});

		$fSelect.find(".fake-select__current").click(e =>{
			if ($fSelect.hasClass("js__opened"))
				this.closeSelect();
			else
				this.openSelect();
		});

		$fSelect.find(".fake-select__list-one").click(function(){
			let $this = $(this).find(".fake-select__item");

			self.curVal = $this.attr("data-val")

			self.remakeSelect();
		});
	}
}

class mobileMenu{
	static open(){
		$('body').addClass("mobile-menu--open");
		$(".burger").addClass('open');
		$('.head__mobile_dropdown ul').removeClass('sub_menu__open');
	}
	static close(){
		$('body').removeClass("mobile-menu--open");
		$(".burger").removeClass('open');
	}
	static toggle(){
		if ($("body").hasClass("mobile-menu--open"))
			this.close()
		else
			this.open()
	}
}