import { getUsers, getPosts } from "./data/DataManager.js";
import { NavBar } from "./nav/NavBar.js";

import { PostList } from "./feed/postlist.js";

// const allUsers = getUsers()
//     .then(apiUsers => {
//         console.log("allUsers", apiUsers)
//     }

//     )







const showPostList = () => {
    //Get a reference to the location on the DOM where the list will display
    const postElement = document.querySelector(".post");
    getPosts().then((allPosts) => {

        postElement.innerHTML = PostList(allPosts);
    })
}



const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");

    navElement.innerHTML = NavBar();


}





const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        //console.log("You clicked on logout")
    }
})

const startGiffyGram = () => {
    showPostList();
    showNavBar();
}

startGiffyGram();
