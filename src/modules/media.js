class Media {
  constructor() {
    this.apiURL = 'https://api.tvmaze.com/';
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
            <span> <i class="fa fa-heart" data-id=${current.show.id}></i>likes</span>
          </div>
          <div class="diplay-flex space-around">
            <button class="btn" data-id=${current.show.id}>Comments</button>
          </div>          
        </div>
        `;
      }
      return total;
    }, '');
    document.getElementById('media-container').innerHTML = docs;
  }
}

export default Media;