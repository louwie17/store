import apiFetch from '@wordpress/api-fetch';

const List = () => {
	return apiFetch( { path: '/ijab-store/v1/products' } );
};

const Create = ( data ) => {
	return apiFetch( {
		path: '/ijab-store/v1/products',
		method: 'POST',
		data,
	} );
};

const Edit = ( data, id ) => {
	return apiFetch( {
		path: `/ijab-store/v1/products/${ id }`,
		method: 'PUT',
		data,
	} );
};

const Remove = ( data, id ) => {
	return apiFetch( {
		path: `/ijab-store/v1/products/${ id }`,
		method: 'DELETE',
		data,
	} );
};

export { List, Create, Edit, Remove };
