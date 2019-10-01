'use strict';

module.exports = {
	name: 'discountItemWise-method',
	async register(server) {
		server.method('discountItemWise', (quantity, item_object) => {
			return new Promise(async (resolve, reject) => {
				let discount = 0;

				if (item_object['freeItems'] > 0 && quantity > item_object['purchaseItems']) {
					let total_free_item_customer_get = 0;
					let number_of_items_purchased = 0;

					while (number_of_items_purchased !== quantity) {
						if (number_of_items_purchased >= quantity) {
							number_of_items_purchased += quantity - number_of_items_purchased;
							total_free_item_customer_get = total_free_item_customer_get - item_object['freeItems'];
						} else {
							number_of_items_purchased =
								number_of_items_purchased + item_object['freeItems'] + item_object['purchaseItems'];
							total_free_item_customer_get += item_object['freeItems'];
						}
					}

					discount = total_free_item_customer_get * item_object['rate'];
				}
				return resolve(discount);
			});
		});
	}
};
