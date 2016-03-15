/** @jsx element */
import {element, createApp} from 'deku';
import Root from './root';

import './index.html';

var render = createApp(document.getElementById('app'));

render(<Root/>);

// const app = tree(<Root/>);
// render(app, document.getElementById('app'));
