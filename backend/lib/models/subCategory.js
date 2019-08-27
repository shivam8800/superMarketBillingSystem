'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class SubCategory extends Model {
	static get tableName() {
		return 'SubCategories';
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number().integer().greater(0),
			subCategory: Joi.string().required(),
			discount: Joi.number().integer().default(0),
			categoryId: Joi.number().integer().greater(0).required()
		});
	}

	static get relationMappings() {
		const Category = require('./category');
		const Item = require('./item');

		return {
			category: {
				relation: Model.BelongsToOneRelation,
				modelClass: Category,
				join: {
					from: 'Categories.id',
					to: 'SubCategories.categoryId'
				}
			},
			item: {
				relation: Model.HasManyRelation,
				modelClass: Item,
				join: {
					from: 'SubCategories.id',
					to: 'Items.subCategoryId'
				}
			}
		};
	}
};
