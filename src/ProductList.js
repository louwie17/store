import React, { useState, useEffect } from 'react';
import { ProductListItem } from './ProductListItem';

export const ProductList = ( props ) => {
	return (
		<div className="product-list">
			<div className="row product-list-table-headers">
				<div className="column title">
					<strong>Title</strong>
				</div>
				<div className="column price">
					<strong>Price</strong>
				</div>
				<div className="column description">
					<strong>Description</strong>
				</div>
			</div>
			{ props.productList.map( ( item ) => (
				<ProductListItem key={ item.id } item={ item } />
			) ) }
		</div>
	);
};
