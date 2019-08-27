exports.up = async (knex) => {
	await knex.schema
		.createTable('Categories', (t) => {
			t.increments('id').primary();
			t.string('category').notNullable().defaultTo('').unique();
			t.integer('discount').defaultTo(0);
		})
		.createTable('SubCategories', (t) => {
			t.increments('id').primary();
			t.string('subCategory').notNullable().defaultTo('').unique();
			t.integer('discount').defaultTo(0);

			t.integer('categoryId').unsigned().notNullable().references('Categories.id').onDelete('cascade');
		});
};

exports.down = async (knex) => {
	await knex.schema.dropTable('SubCategories').table('Categories', (t) => {
		t.dropColumn('category');
		t.dropColumn('discount(%)');
	});
};
