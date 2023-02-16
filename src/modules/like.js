class Like {
  static likeHandler = (item) => {
    const faHeart = document.querySelectorAll('.fa-heart');
    faHeart.forEach((btn) => {
      btn.addEventListener('click', () => {
        const contentID = parseInt(btn.getAttribute('like-id'), 10);
        item.submitLike(contentID);
      });
    });
  }
}

export default Like;