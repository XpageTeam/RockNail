Vue.use(Vuex);

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

// window.headSearch = headSearch;

const loadScripts = e => {
	$(".fancybox").fancybox({
		beforeShow(){
			$("body").addClass("fancy-active")
		},
		afterClose(){
			$("body").removeClass("fancy-active")
		}
	});

	$(".search-button").click(e => {
		headSearch.toggleSearch();

		return false;
	});

	$(".search-close").click(e => {
		headSearch.closeSearch();
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