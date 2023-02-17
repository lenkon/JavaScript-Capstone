const displayComment = (id) => {
  const commentsDetails = document.getElementById('comments-container');
  let fetchData = [];
  const commentURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/74cyJ20SDdwGX6ZlDnzP/comments?item_id=';

  const fetchComment = async () => {
    const result = await fetch(`${commentURL}${id}`).then((response) => response.json());
    return result;
  };

  fetchComment().then((response) => {
    commentsDetails.innerHTML = '';
    if (response) {
      fetchData = response;
      for (let i = 0; i < fetchData.length; i += 1) {
        commentsDetails.innerHTML += `
          <li class="comment-items"> <p>${fetchData[i].creation_date}</p><p>${fetchData[i].username}:</p><p>${fetchData[i].comment}</p></li>      
        `;
      }
      document.getElementById('count').innerHTML = fetchData.length > 0 ? `${fetchData.length}` : '0';
    }
  });
};

export default displayComment;