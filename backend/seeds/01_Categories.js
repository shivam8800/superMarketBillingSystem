exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Categories').del().then(function() {
		// Inserts seed entries
		return knex('Categories').insert([
			{ id: 1, category: 'Produce', discount: 10 },
			{ id: 2, category: 'Dairy', discount: 15 }
		]);
	});
};
