import { getUsers, getPosts } from "./data/DataManager.js";
import { NavBar } from "./nav/NavBar.js";

import { PostList } from "./feed/postlist.js";
import { footbar } from "./footer/footer.js";

const allUsers = getUsers()
    .then(apiUsers => {
        console.log("allUsers", apiUsers)
    }

    )







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


const showFootBar = () => {
    const footerElement = document.querySelector(".footer_nav")
    footerElement.innerHTML = footbar();
}





const applicationElement = document.querySelector(".giffygram");

// applicationElement.addEventListener("click", event => {
//     console.log("what was clicked", event.target)
//     if (event.target.id === "logout") {
//         console.log("are you sure you want logout?")
//     }
// })
// the same fucntion in different way
const giffyclick = (event) => {
    console.log("what was clicked", event.target)
    if (event.target.id === "logout") {
        console.log("are you sure you want logout?")
    }
}
applicationElement.addEventListener("click", giffyclick)




const startGiffyGram = () => {
    showPostList();
    showNavBar();
    showFootBar();
}

startGiffyGram();



applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)

        console.log(`User wants to see posts since ${yearAsNumber}`)
    }
})