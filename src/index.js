// Import SCSS entry file so that webpack picks up changes
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { ProductItem } from './ProductItem';
import { ProductList } from './ProductList';
import './index.scss';

const RootComponent = () => {
	const [ viewButtonRow, viewCancelSave ] = useState( false );
	const [ productList, updateProductList ] = useState( [] );

	const onCancel = () => {
		viewCancelSave( false );
	};

	const onProductSave = () => {
		viewCancelSave( true );
	};

	useEffect( () => {
		fetch( 'http://localhost:8888/wp-json/ijab-store/v1/products' )
			.then( ( response ) => response.json() )
			.then( ( response ) => updateProductList( response ) );
	}, [] );

	return (
		<>
			<div className="row">
				<h1 className="column">All Products</h1>
				<div className="column add-product">
					<p>
						<button
							className="button button-primary"
							onClick={ () => viewCancelSave( true ) }
							disabled={ viewButtonRow }
						>
							Add Product
						</button>
					</p>
				</div>
			</div>
			{ viewButtonRow && (
				<ProductItem
					onCancel={ onCancel }
					onProductSave={ onProductSave }
				/>
			) }
			<ProductList productList={ productList } />
		</>
	);
};
const domContainer = document.querySelector( '.store-wrapper' );
render( <RootComponent />, domContainer );
