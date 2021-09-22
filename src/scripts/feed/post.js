import { getLikes } from "./../data/DataManager.js";

const getNumberOfLikes = (postId) => {
  getLikes(postId)
    .then(response => {
      document.querySelector(`#likes__${postId}`).innerHTML = `👍 ${response.length}`;
    })
}

export const posts = (postObject) => {
  return `
      <section class="post">
      <h1 class="post__name">${postObject.user.name}</h1>
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p id="likes__${postObject.id}">👍 ${getNumberOfLikes(postObject.id)}</p>
        <p>${postObject.description}</p>
        <div><button id="edit__${postObject.id}">Edit</button></div>
        <button id="delete__${postObject.id}">Delete</button>
        <button id="like__${postObject.id}">Like</button>

      </section>
    `
}