// Import SCSS entry file so that webpack picks up changes
import React, { Component } from 'react';
import { render } from 'react-dom';
import { ProductItem } from './ProductItem.js';
import './index.scss';

class RootComponent extends Component {
	state = {
		canSave: false,
		viewButtonRow: false,
	};

	viewCancelSave = () => {
		this.setState( {
			viewButtonRow: true,
		} );
	};

	hideCancelSave = () => {
		this.setState( {
			viewButtonRow: false,
		} );
	};

	disableSave = () => {
		this.setState( {
			canSave: false,
		} );
	};

	enableSave = () => {
		this.setState( {
			canSave: true,
		} );
	};

	render() {
		return (
			<>
				<h2>Store React app</h2>
				<div className="add-product">
					<button
						className="button button-primary"
						onClick={ this.viewCancelSave }
						disabled={ this.state.viewButtonRow }
					>
						Add Product
					</button>
				</div>
				{ this.state.viewButtonRow && (
					<ProductItem
						canSave={ this.state.canSave }
						disableSave={ this.disableSave }
						enableSave={ this.enableSave }
						hideCancelSave={ this.hideCancelSave }
					/>
				) }
			</>
		);
	}
}
const domContainer = document.querySelector( '.store-wrapper' );
render( <RootComponent />, domContainer );
