import logo from '../assets/medialogo.png';

const myLogo = new Image();
myLogo.src = logo;

const navbar = () => {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <div><img src= ${logo} alt="logo" id="logo"></div>
    <ul class="navbar-list">
      <li class="active"><a href="#">Shows</a></li>
      <li><a href="#">Drama</a></li>
      <li><a href="#">Music</a></li>
    </ul>
  `;
};

export default navbar;