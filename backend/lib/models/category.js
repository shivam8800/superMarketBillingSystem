'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class Category extends Model {
	static get tableName() {
		return 'Categories';
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number().integer().greater(0),
			category: Joi.string().required(),
			discount: Joi.number().integer().default(0)
		});
	}

	static get relationMappings() {
		const SubCategory = require('./subCategory');

		return {
			subCategory: {
				relation: Model.HasManyRelation,
				modelClass: SubCategory,
				join: {
					from: 'Categories.id',
					to: 'SubCategories.categoryId'
				}
			}
		};
	}
};
