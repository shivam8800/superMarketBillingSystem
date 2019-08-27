'use strict';

module.exports = {
	name: 'discountPercentageWise-method',
	async register(server) {
		server.method('discountPercentageWise', (rate_before_discount, item_object) => {
			return new Promise(async (resolve, reject) => {
				let discount = 0;
				let max_discount = Math.max(
					...Object.values({
						ItemDiscount: item_object['ItemDiscount'],
						SubCategoryDiscount: item_object['SubCategoryDiscount'],
						CategoryDiscount: item_object['CategoryDiscount']
					})
				);
				discount = rate_before_discount * max_discount / 100;
				return resolve(discount);
			});
		});
	}
};
