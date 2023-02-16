import navbar from './modules/navbar.js';
import Media from './modules/media.js';
import comments from './modules/comments.js';
import './style/style.css';

const media = new Media();
navbar();
media.showContents();
comments();