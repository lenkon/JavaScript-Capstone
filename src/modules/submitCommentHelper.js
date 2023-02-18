import './comments.js';
import displayComment from './displayCommentHelper.js';

const submitComment = () => {
  let input = {};
  const name = document.getElementById('text-name');
  const textInsight = document.getElementById('text-insights');
  const commentURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/74cyJ20SDdwGX6ZlDnzP/comments';
  const submitToStorage = async (input, id) => {
    await fetch(`${commentURL}`, {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => {
      response.json();
    });
    name.value = '';
    textInsight.value = '';

    displayComment(id);
  };

  window.submitComment = (id) => {
    input = {
      item_id: id,
      username: name.value,
      comment: textInsight.value,
    };

    submitToStorage(input, id);
  };
};

export default submitComment;