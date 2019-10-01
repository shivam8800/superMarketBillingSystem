('use strict');

const Fs = require('fs');
const Boom = require('@hapi/boom');
const Helpers = require('../helpers');

module.exports = Helpers.withDefaults([
	{
		method: 'post',
		path: '/customer_purchase_details',
		options: {
			payload: {
				output: 'stream',
				parse: true,
				allow: 'multipart/form-data'
			},
			handler: async (request, h) => {
				return new Promise((resolve, reject) => {
					const { itemService } = request.services();
					// return resolve({ error: true, message: 'server error' });
					var data = request.payload;
					if (data.file) {
						const name = data.file.hapi.filename;
						var path = __dirname + '/' + name;
						var file = Fs.createWriteStream(path);

						file.on('error', function(err) {
							return reject(err);
						});

						data.file.pipe(file);

						data.file.on('end', async function(err) {
							if (err) {
								return reject(Boom.badData(err));
							}
						});

						Fs.readFile(path, 'utf8', async function(err, data) {
							if (err) {
								return reject(Boom.badImplementation(err));
							} else if (data) {
								let lines = data.split('\n');
								/*  Assuming second and third element would customer first  and  last name respectively
								         *
								         */
								let customer_name = lines[0].split(' ')[1] + ' ' + lines[0].split(' ')[2];
								/*  calculate maximun discount and formating data
								        **
								        */
								let total_rate_before_discount = 0,
									total_rate_after_discount = 0;
								let formated_purchase_details = lines[1].split(',').map(async (item_details) => {
									let item_details_listed = item_details.split(/([0-9]+)/);
									let item_name = item_details_listed[0].trim();

									let item = await itemService.findOneItemDetails(item_name);
									if (item.length == 0)
										return reject(Boom.badRequest(`${item_name} is not found at DB`));

									let quantity = parseInt(item_details_listed[1]);
									let rate_before_discount = quantity * item[0]['rate'];

									let discount =
										item[0]['ItemDiscount'] == 0
											? await request.server.methods.discountItemWise(quantity, item[0])
											: await request.server.methods.discountPercentageWise(
													rate_before_discount,
													item[0]
												);

									rate_after_discount = rate_before_discount - discount;
									total_rate_before_discount += rate_before_discount;
									total_rate_after_discount += rate_after_discount;

									return {
										item: item_name,
										quantity: item_details_listed[1] + item_details_listed[2],
										rate_after_discount: rate_after_discount,
										rate_before_discount: rate_before_discount
									};
								});

								Fs.unlinkSync(path);

								return resolve({
									customer_name: customer_name,
									purchased_items_details: await Promise.all(formated_purchase_details),
									total_rate_before_discount: total_rate_before_discount,
									total_rate_after_discount: total_rate_after_discount,
									total_savings: total_rate_before_discount - total_rate_after_discount
								});
							} else {
								return reject(Boom.badImplementation('Can"t read file'));
							}
						});
					} else {
						return reject(Boom.badRequest('There is no file, make sure upload file with file key'));
					}
				});
			}
		}
	}
]);
