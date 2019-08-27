exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('SubCategories').del().then(function() {
		// Inserts seed entries
		return knex('SubCategories')
			.insert([
				{ id: 1, subCategory: 'Fruits', discount: 18, categoryId: 1 },
				{ id: 2, subCategory: 'Veg', discount: 5, categoryId: 1 },
				{ id: 3, subCategory: 'Milk', discount: 20, categoryId: 2 },
				{ id: 4, subCategory: 'Cheese', discount: 20, categoryId: 2 }
			])
			.then((res) => {
				return knex('Items').del().then(function() {
					// Inserts seed entries
					return knex('Items').insert([
						{
							id: 1,
							item: 'Apple',
							discount: 0,
							rate: 50,
							measurement: 'kilogram',
							purchaseItems: 3,
							freeItems: 1,
							subCategoryId: 1
						},
						{
							id: 2,
							item: 'Orange',
							discount: 20,
							rate: 80,
							measurement: 'kilogram',
							purchaseItems: 0,
							freeItems: 0,
							subCategoryId: 1
						},
						{
							id: 3,
							item: 'Potato',
							discount: 0,
							rate: 30,
							measurement: 'kilogram',
							purchaseItems: 5,
							freeItems: 2,
							subCategoryId: 2
						},
						{
							id: 4,
							item: 'Tomato',
							discount: 10,
							rate: 70,
							measurement: 'kilogram',
							purchaseItems: 0,
							freeItems: 0,
							subCategoryId: 2
						},
						{
							id: 5,
							item: 'Cow Milk',
							discount: 0,
							rate: 50,
							measurement: 'litre',
							purchaseItems: 3,
							freeItems: 1,
							subCategoryId: 3
						},
						{
							id: 6,
							item: 'Soy Milk',
							discount: 10,
							rate: 40,
							measurement: 'litre',
							purchaseItems: 0,
							freeItems: 0,
							subCategoryId: 3
						},
						{
							id: 7,
							item: 'Cheddar',
							discount: 0,
							rate: 50,
							measurement: 'kilogram',
							purchaseItems: 2,
							freeItems: 1,
							subCategoryId: 4
						},
						{
							id: 8,
							item: 'Gouda',
							discount: 10,
							rate: 80,
							measurement: 'kilogram',
							purchaseItems: 0,
							freeItems: 0,
							subCategoryId: 4
						}
					]);
				});
			});
	});
};
