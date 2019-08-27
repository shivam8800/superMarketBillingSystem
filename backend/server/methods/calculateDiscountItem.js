'use strict';

module.exports = {
	name: 'discountItemWise-method',
	async register(server) {
		server.method('discountItemWise', (quantity, item_object) => {
			return new Promise(async (resolve, reject) => {
				let discount = 0;

				if (item_object['freeItems'] > 0 && quantity > item_object['purchaseItems']) {
					let total_free_item_customer_get;

					let reminder = quantity % item_object['purchaseItems'];

					total_free_item_customer_get =
						reminder == 0
							? Math.floor(quantity / item_object['purchaseItems']) - 1
							: Math.floor(quantity / item_object['purchaseItems']);

					discount = total_free_item_customer_get * item_object['rate'] * item_object['freeItems'];
				}
				return resolve(discount);
			});
		});
	}
};
