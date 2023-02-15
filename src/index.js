import './style/style.css';
import navbar from './modules/navbar.js';
import Media from './modules/media.js';

const media = new Media();
navbar();
media.showContents();
