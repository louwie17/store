import React, { useState } from 'react';

export const ProductItem = ( props ) => {
	const [ title, setTitle ] = useState( '' );
	const [ error, setError ] = useState( false );

	const handleChange = ( e ) => {
		const value = e.target.value;
		setTitle( value );
		if ( value.length < 5 || value.length > 30 ) {
			setError( true );
			props.handleSave( false );
		} else {
			setError( false );
			props.handleSave( true );
		}
	};

	return (
		<form className="product-wrapper">
			<div className="product-title-price row">
				<label htmlFor="title" className="title column">
					<p>Title</p>
					<input
						name="title"
						type="text"
						className={ error ? 'error' : 'valid' }
						value={ title }
						onChange={ ( e ) => handleChange( e ) }
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
				<textarea name="description" className="description"></textarea>
			</label>
			<div className="button-group">
				<button
					className="button button-secondary"
					onClick={ () => props.hideCancelSave() }
				>
					Cancel
				</button>
				<button
					className="button button-primary"
					disabled={ ! props.canSave }
				>
					Save
				</button>
			</div>
		</form>
	);
};
