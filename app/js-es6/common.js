Vue.use(Vuex);
// sergey new code-------------
$(document).ready(function(){
	// слайдер
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
	// табы в форме регистрации
	$(".login-__form_tabs a").click(function(){
		let $this = $(this);
		let id = $this.attr("data-id");
		$('.login-__form_tabs a').removeClass('active')
		$(this).addClass('active')
		$('.login-_form form').css("display", "none")
		$(".login-_form form[data-id='"+id+"']").css("display", "block")
	});
	// закрытие формы покупки товара
	$(".popup_buy-__close").click(function(){
		$.fancybox.close()
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
	}
	static close(){
		$("body").removeClass("js__submenu-opened");
		$(".head__submenu").removeClass("js__opened");
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
		},
		afterShow(){
			// слайдер
			$(".card__slick").slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				slide: ".card__slick_slide",
				asNavFor: '.card__slick_nav',
			})
			$('.card__slick_nav').slick({
				slidesToShow: 5,
				slidesToScroll: 1,
				slide: ".card__slick_slide",
				asNavFor: '.card__slick',
				focusOnSelect: true,
				arrows: false,
			});
		}
	});

	// afterShow

	$(".search-button").click(e => {
		headSearch.toggleSearch();

		return false;
	});

	$(".search-close").click(e => {
		headSearch.closeSearch();
	});

	$(".head-title").click(e => {
		headSubmenu.toggle()
	});

	$(".catalog-slider").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		slide: ".catalog-slider__slide",
	});

	$(".big-slider").slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		slide: ".big-slider__slide",
		centerMode: true,
		centerPadding: 0,
		// arrows: false,
		appendArrows: $(".big-slider__arrows"),
		// variableWidth: true
	})
};


Vue.component("cart-line", {
	props: {

	},
	data: () => ({

	}),
	mounted(){
		console.log("cart-line mounted");
	},
	methods: {
		deleteFromCart(id){
			Store.commit("deleteGoods", id);
		},
	},
	computed: {
		goodsList: () => Store.state.goodsInCart,
		goodsCount: () => Store.state.goodsInCart.length,
		goodsPrice(){
			let totalSumm = 0;

			for (let i in this.goodsList)
				totalSumm += this.goodsList[i].price * this.goodsList[i].count

			return totalSumm;
		}
	}
});

window.Store = new Vuex.Store({
	state: {
		goodsInCart: []
	},
	mutations: {
		addGoods(state, goods = []){
			for (let i in goods){
				state.goodsInCart.push(goods[i]);
			}
		},
		deleteGoods(state, goodsId){
			let key, canDelete = false;

			for (let i in state.goodsInCart){
				key = i;

				if (state.goodsInCart[i].id == goodsId){
					canDelete = true;
					break;
				}
			}


			if (canDelete)
				state.goodsInCart.splice(key, 1);
			else
				console.log("Такого товара нет в списке");
		}
	}
});

window.App = new Vue({
	el: "#page-wr",
	store: Store,
	data: {

	},
	mounted(){
		loadScripts();
		console.log("app mounted");
	}
});

$(e => {
	Store.commit("addGoods", [
		{
			id: 0,
			name: "Гель-лак Rock Nail Baby Nude",
			info: "045 Blue Ocean",
			imgSrc: "img/photos/nail.png",
			link: "#",
			price: 250,
			count: 1,
		},
		{
			id: 1,
			name: "Гель-лак Rock Nail Baby Nude",
			info: "045 Blue Ocean",
			imgSrc: "img/photos/nail.png",
			link: "#",
			price: 250,
			count: 3,
		},
		{
			id: 2,
			name: "Гель-лак Rock Nail Baby Nude",
			info: "045 Blue Ocean",
			imgSrc: "img/photos/nail.png",
			link: "#",
			price: 250,
			count: 2,
		},
		{
			id: 3,
			name: "Гель-лак Rock Nail Baby Nude",
			info: "045 Blue Ocean",
			imgSrc: "img/photos/nail.png",
			link: "#",
			price: 250,
			count: 1,
		},
	]);
})

$(function() {
	if($(window).width() > 790) {
		$(".selectize").each((i, el) =>{
			let $this = $(el);

			$(".selectize").selectize();
		});
	};

	// $(".cart-current-city .selectize").each((i, el) =>{
	// 	let $this = $(el);
	// 	$(".selectize").selectize();
	// });

	var asideClone = $('.catalog .aside').clone().addClass('js__catalog-filter');
	$('.catalog .title-block__title').append(asideClone);



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




