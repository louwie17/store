// Import SCSS entry file so that webpack picks up changes
import { render } from 'react-dom';
import './index.scss';

function RootComponent() {
	return <h2>Store React app</h2>;
}
const domContainer = document.querySelector( '.store-wrapper' );
render( <RootComponent />, domContainer );
