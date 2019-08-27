'use strict';

const Schmervice = require('schmervice');

module.exports = class ItemService extends Schmervice.Service {
	async findOneItemDetails(item) {
		const { Item } = this.server.models();
		let data = await Item.raw(/*sql*/ `
            select I.item, I.rate,  I.purchaseItems, I.freeItems, I.discount as 'ItemDiscount', SB.discount as "SubCategoryDiscount", C.discount as "CategoryDiscount" from Items I, SubCategories SB, Categories C where item="${item}" and I.subCategoryId=SB.id and SB.categoryId=C.id
		`);

		return data[0];
	}
};
