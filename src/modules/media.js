import Like from './like.js';

class Media {
  constructor() {
    this.apiURL = 'https://api.tvmaze.com/';
    this.likesURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/74cyJ20SDdwGX6ZlDnzP/likes/';
    this.contents = [];
    this.likes = [];
  }

  getContents = async (searchVal) => {
    const searchURL = `search/shows?q=${searchVal}`;
    const fetchVal = await fetch(`${this.apiURL}${searchURL}`).then((response) => response.json());
    this.contents = [...this.contents, ...fetchVal];
  }

  getContentItemCount = () => this.contents.filter((e) => e.show.image !== null).length;

  fetchLikes = async () => {
    this.likes = await fetch(this.likesURL).then((response) => response.json());
  }

  showContents = async () => {
    await this.getContents('documentaries');
    await this.getContents('animals');
    await this.getContents('hits');
    await this.fetchLikes();

    const docs = this.contents.reduce((total, current) => {
      if (current.show.image) {
        const likeIndex = this.likes.findIndex((like) => like.item_id === current.show.id);
        const likeCount = likeIndex >= 0 ? this.likes[likeIndex].likes : 0;
        total += `
          <div class="media-item">          
            <div class="display-flex space-around">
              <img src=${current.show.image.medium} />
            </div>
            <div class="media-details display-flex space-evenly">
              <div class="media-name">${current.show.name.substring(0, 14)}</div>
              <div class="like-count">
                <span>${likeCount}</span>
                <i class="fa fa-heart" like-id=${current.show.id}></i>
              </div>              
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
    document.querySelector('h1 span').innerHTML = this.getContentItemCount(this.contents);
  }

  submitLike = async (contentID, likeBtn) => {
    await fetch(this.likesURL, {
      method: 'POST',
      body: JSON.stringify({
        item_id: contentID,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.text(response)).then((json) => json);

    await this.fetchLikes();

    const likeIndex = this.likes.findIndex((like) => like.item_id === contentID);

    const likeCount = likeIndex >= 0 ? this.likes[likeIndex].likes : 0;
    likeBtn.previousElementSibling.innerHTML = likeCount;
  }
}

export default Media;