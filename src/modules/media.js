import Like from './like.js';

class Media {
  constructor() {
    this.apiURL = 'https://api.tvmaze.com/';
    this.likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/74cyJ20SDdwGX6ZlDnzP/likes/';
    this.contents = [];
  }

  getContents = async (searchVal) => {
    const searchURL = `search/shows?q=${searchVal}`;
    const fetchVal = await fetch(`${this.apiURL}${searchURL}`).then((response) => response.json());
    this.contents = [...this.contents, ...fetchVal];
  }

  showContents = async () => {
    await this.getContents('documentaries');
    await this.getContents('animals');
    await this.getContents('hits');

    const docs = this.contents.reduce((total, current) => {
      if (current.show.image) {
        total += `
          <div class="media-item">          
            <div class="display-flex space-around">
              <img src=${current.show.image.medium} />
            </div>
            <div class="media-details display-flex space-evenly">
              <span>${current.show.name.substring(0, 14)}</span>
              <span> <i class="fa fa-heart" like-id=${current.show.id}></i>likes</span>
            </div>
            <div class="diplay-flex space-around">            
              <button class="btn" id="${current.show.id}" type="button" onclick="popUpComment(${current.show.id})">Comments</button>
            </div>          
          </div>
          `;
      }
      return total;
    },
    '');
    document.getElementById('media-container').innerHTML = docs;
    Like.likeHandler(this);
  }

  submitLike = async (contentID) => {
    await fetch(this.likesURL, {
      method: 'POST',
      body: JSON.stringify({
        item_id: contentID,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.text(response)).then((json) => json);
  }
}

export default Media;