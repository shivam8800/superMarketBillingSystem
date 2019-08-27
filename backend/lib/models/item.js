'use strict';

const Joi = require('@hapi/joi');
const { Model } = require('./helpers');

module.exports = class Item extends Model {
	static get tableName() {
		return 'Items';
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number().integer().greater(0),
			item: Joi.string().required(),
			rate: Joi.number().integer().required(),
			measurement: Joi.string().required(),
			discount: Joi.number().integer().default(0),
			purchaseItems: Joi.number().integer().default(0),
			freeItems: Joi.number().integer().default(0),
			subCategoryId: Joi.number().integer().greater(0).required()
		});
	}

	static get relationMappings() {
		const SubCategory = require('./subCategory');

		return {
			subCategory: {
				relation: Model.BelongsToOneRelation,
				modelClass: SubCategory,
				join: {
					from: 'SubCategories.id',
					to: 'Items.subCategoryId'
				}
			}
		};
	}
};
