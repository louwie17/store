import React, { useState } from 'react';
import { Create } from './DataStore';
import { ProductList } from './ProductList';

export const ProductItem = ( props ) => {
	const [ title, setTitle ] = useState( '' );
	const [ price, setPrice ] = useState( '' );
	const [ description, setDescription ] = useState( '' );
	const [ error, setError ] = useState( false );
	const [ canSave, enableSave ] = useState( false );

	const handleChange = ( e ) => {
		const value = e.target.value;
		setTitle( value );
		if ( value.length < 5 || value.length > 30 ) {
			setError( true );
			enableSave( false );
		} else {
			setError( false );
			enableSave( true );
		}
	};

	const handleSubmit = ( e ) => {
		e.preventDefault();
		const data = {
			title,
			price,
			description,
		};
		Create( data )
			.then( ( response ) => {
				console.log( response );
				setTitle( '' );
				setPrice( '' );
				setDescription( '' );
			} )
			.catch( ( problem ) => {
				console.log( problem );
			} );
	};

	return (
		<form className="product-wrapper" onSubmit={ handleSubmit }>
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
						value={ price }
						onChange={ ( e ) => setPrice( e.target.value ) }
					/>
				</label>
			</div>
			<label htmlFor="description">
				<p>Description</p>
				<textarea
					name="description"
					className="description"
					value={ description }
					onChange={ ( e ) => setDescription( e.target.value ) }
				></textarea>
			</label>
			<div className="button-group">
				<button
					className="button button-secondary"
					onClick={ () => props.onCancel() }
				>
					Cancel
				</button>
				<button
					className="button button-primary"
					disabled={ ! canSave }
					onClick={ () => props.onProductSave() }
				>
					Save
				</button>
			</div>
		</form>
	);
};
