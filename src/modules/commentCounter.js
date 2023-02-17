const commentCounter = async (id) => {
  let fetchData = [];
  const result = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/74cyJ20SDdwGX6ZlDnzP/comments?item_id=${id}`).then((response) => response.json());

  fetchData = result;
  return fetchData.length;
};

export default commentCounter;