// Import SCSS entry file so that webpack picks up changes
import React, { useState } from 'react';
import { render } from 'react-dom';
import { ProductItem } from './ProductItem.js';
import './index.scss';

const RootComponent = () => {
	const [ canSave, enableSave ] = useState( false );
	const [ viewButtonRow, viewCancelSave ] = useState( false );

	const hideCancelSave = () => {
		viewCancelSave( false );
	};

	const handleSave = ( v ) => {
		enableSave( v );
	};

	return (
		<>
			<h2>Store React app</h2>
			<div className="add-product">
				<button
					className="button button-primary"
					onClick={ () => viewCancelSave( true ) }
					disabled={ viewButtonRow }
				>
					Add Product
				</button>
			</div>
			{ viewButtonRow && (
				<ProductItem
					canSave={ canSave }
					handleSave={ handleSave }
					hideCancelSave={ hideCancelSave }
				/>
			) }
		</>
	);
};
const domContainer = document.querySelector( '.store-wrapper' );
render( <RootComponent />, domContainer );
