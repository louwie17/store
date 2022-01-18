import React from 'react';

export const ProductListItem = ( props ) => {
	return (
		<div className="row product-list item">
			<div className="column title">
				<p>{ props.item.title }</p>
			</div>
			<div className="column price">
				<p>{ props.item.price }</p>
			</div>
			<div className="column description">
				<p>{ props.item.description }</p>
			</div>
		</div>
	);
};
