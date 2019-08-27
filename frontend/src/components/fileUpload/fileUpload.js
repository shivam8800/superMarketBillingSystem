import React from 'react';
import './fileUpload.css';
import { fileUploadService } from '../../network/Api';

class fileUpload extends React.Component {
	constructor(props) {
		super(props);
		this.state = { display: 'flex', apiData: {} };
	}

	uploadFile(event) {
		document.getElementsByClassName('label')[0].innerText = event.target.files[0].name;
		this.setState({ display: 'none' });

		fileUploadService(event.target.files[0])
			.then((responseJson) => {
				this.setState({ apiData: responseJson });
			})
			.catch((error) => {
				console.log(error.error);
			});
	}

	render() {
		if (this.state.display === 'none' && this.state.apiData.customer_name) {
			return (
				<div className="result-container">
					<h4>Following is the invoice is generated based on the above items that customer bought:</h4>
					<h4>Customer: {this.state.apiData.customer_name}</h4>
					<div className="result-table">
						<h4>Item</h4>
						<h4>Qty</h4>
						<h4>Amount</h4>
					</div>
					{this.state.apiData.purchased_items_details.map((item) => {
						return (
							<div className="result-table">
								<p>{item.item}</p>
								<p>{item.quantity}</p>
								<p>{item.rate_after_discount}</p>
							</div>
						);
					})}
					<h4>-------------------------------------------------------</h4>
					<div className="result-table">
						<h4>Total Amount</h4>
						<h4>{this.state.apiData.total_rate_after_discount + ' Rs'}</h4>
					</div>
					<div className="result-table">
						<h4>You Saved</h4>
						<h4>
							{this.state.apiData.total_rate_before_discount +
								' - ' +
								this.state.apiData.total_rate_after_discount +
								' = ' +
								this.state.apiData.total_savings +
								' Rs'}
						</h4>
					</div>
				</div>
			);
		}
		return (
			<div className="App">
				<div>
					<h1>
						Text file formated supported only and file should have only one customer purchasing details{' '}
					</h1>
					<h2>Input Sample :- </h2>
					<p>Customer Anish Kumar buys following items</p>
					<p>Apple 6Kg, Orange 2Kg, Potato 14Kg, Tomato 3Kg, Cow Milk 8Lt, Gouda 2Kg </p>
				</div>
				<div className="file-input-container">
					<div class="file-input" style={{ display: this.state.display }}>
						<input type="file" onChange={this.uploadFile.bind(this)} />
						<span class="button">Choose</span>
						<span class="label" data-js-label>
							No file selected
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default fileUpload;
