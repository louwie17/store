import React, { Component } from 'react';

export class ProductItem extends Component {
	state = {
		title: '',
		price: 0,
		description: '',
		error: false,
	};

	handleChange( e ) {
		const value = e.target.value;
		this.setState( {
			title: value,
		} );
		if ( value.length < 5 || value.length > 30 ) {
			this.setState( {
				error: true,
			} );
			this.props.disableSave();
		} else {
			this.setState( {
				error: false,
			} );
			this.props.enableSave();
		}
	}

	render() {
		return (
			<form className="product-wrapper">
				<div className="product-title-price row">
					<label htmlFor="title" className="title column">
						<p>Title</p>
						<input
							name="title"
							type="text"
							className={ this.state.error ? 'error' : 'valid' }
							value={ this.state.title }
							onChange={ ( e ) => this.handleChange( e ) }
						/>
					</label>
					<label htmlFor="price" className="price column">
						<p>Price</p>
						<input
							name="price"
							type="number"
							min="0"
							className="price"
							placeholder="0.00"
						/>
					</label>
				</div>
				<label htmlFor="description">
					<p>Description</p>
					<textarea
						name="description"
						className="description"
					></textarea>
				</label>
				<div className="button-group">
					<button
						className="button button-secondary"
						onClick={ () => this.props.hideCancelSave() }
					>
						Cancel
					</button>
					<button
						className="button button-primary"
						disabled={ ! this.props.canSave }
					>
						Save
					</button>
				</div>
			</form>
		);
	}
}
