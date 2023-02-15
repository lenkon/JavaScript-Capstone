import './media.js';

const comments = () => {
  const cardContainer = document.getElementById('card-container');
  const popup = document.createElement('div');
  popup.className = 'popup-container';
  const baseApi = 'https://api.tvmaze.com/';
  const details = [{
    country: '', type: '', image: '', name: '', release: '', summary: '',
  }];

  const showContent = () => {
    popup.innerHTML = '';
    document.getElementById('card').style.display = 'block';
    const popupDetails = `
      <div class="popup-close-btn">
        <button onclick="closePopup()" id='close-popup' type="button">
          <i class="fa fa-times fa-2x" aria-hidden="true"></i>
        </button>
      </div>
      <div class="popup-img">
        <img
          src="${details.image}"
          alt="content image"
          id="content-image"
        />
      </div>
      <div class="content-details">
        <p>${details.summary}</p>
      </div>
      <div class="movie-attributes">
        <ul>
          <li><span>Name:</span> ${details.name}</li>
          <li><span>Type:</span> ${details.type}</li>
        </ul>
        <ul>
        <li><span>Country:</span> ${details.country}</li>
          <li><span>Release:</span> ${details.release}</li>
        </ul>
      </div>
      <div class="comment-display">
        <h2>Comments</h2>
        <ul>          
          <li>02/15/2023 Comments</li>
        </ul>
      </div>
      <div class="add-comment">
        <h2>Add Comments</h2>
        <ul>
          <li><input type="text" name="text-name" id="text-name" placeholder="Your Name"></li>
          <li><textarea name="text-insights" id="text-insights" cols="35" rows="7" placeholder="Your insights"></textarea></li>
          <li><button>Comment</button></li>
        </ul>
      </div>
    `;
    popup.innerHTML += popupDetails;
    cardContainer.appendChild(popup);
  };
  const fetchContent = async (id) => {
    const content = await fetch(`${baseApi}shows/${id}`).then((response) => response.json());
    if (content.network === null) {
      details.country = 'N/A';
    } else {
      details.country = content.network.country.name;
    }
    if (content.summary === null) {
      details.summary = '';
    } else {
      details.summary = content.summary;
    }
    details.name = content.name;
    details.type = content.type;
    details.release = content.premiered;
    details.image = content.image.original;
    showContent(id);
  };

  window.popUpComment = (id) => {
    fetchContent(id);
  };

  window.closePopup = () => {
    document.getElementById('card').style.display = 'none';
  };
};

export default comments;