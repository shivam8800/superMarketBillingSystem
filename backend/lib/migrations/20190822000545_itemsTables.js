'use strict';

exports.up = async (knex) => {
	await knex.schema.createTable('Items', (t) => {
		t.increments('id').primary();
		t.string('item').notNullable().defaultTo('').unique();

		t.integer('rate').notNullable();
		t.string('measurement').notNullable();
		t.integer('discount').defaultTo(0);
		t.integer('purchaseItems').defaultTo(0);
		t.integer('freeItems').defaultTo(0);

		t.integer('subCategoryId').unsigned().notNullable().references('SubCategories.id').onDelete('cascade');
	});
};

exports.down = async (knex) => {
	await knex.schema.dropTable('Items');
};
