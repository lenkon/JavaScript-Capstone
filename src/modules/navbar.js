import logo from '../assets/medialogo.png';

const myLogo = new Image();
myLogo.src = logo;

const navbar = () => {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = `
    <div><img src= ${logo} alt="logo" id="logo"></div>
    <ul class="navbar-list">
      <li class="active"><a href="#">Link1</a></li>
      <li><a href="#">Link2</a></li>
      <li><a href="#">Link3</a></li>
    </ul>
  `;
};

export default navbar;