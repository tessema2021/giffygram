import { getUsers, getPosts, usePostCollection, createPost, deletePost, getSinglePost, getLoggedInUser, updatePost } from "./data/DataManager.js";
import { NavBar } from "./nav/NavBar.js";
import { PostEntry } from "./feed/postEntry.js"
import { PostList } from "./feed/postlist.js";
import { footbar } from "./footer/footer.js";
import { PostEdit } from "./feed/postEdit.js";
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


const showPostEntry = () => {
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}


const showEdit = (postObj) => {
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEdit(postObj);
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
        //console.log("are you sure you want logout?")
    }
}


applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
        //collect the input values into an object to post to the DB
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        //we have not created a user yet - for now, we will hard code `1`.
        //we can add the current time as well
        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: 1,
            timestamp: Date.now()
        }

        // be sure to import from the DataManager
        createPost(postObject)
            .then(dbResopnse => {
                showPostList();
            })
    }
})






applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
        const yearAsNumber = parseInt(event.target.value)
        //console.log(`User wants to see posts since ${yearAsNumber}`)
        //invoke a filter function passing the year as an argument
        showFilteredPosts(yearAsNumber);
    }
})

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    // console.log(epoch)
    const filteredData = usePostCollection().filter(singlePost => {
        if (singlePost.timestamp >= epoch) {
            return singlePost
        }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);
}




applicationElement.addEventListener("click", (event) => {

    if (event.target.id.startsWith("edit")) {
        // console.log("post clicked", event.target.id.split("--"))
        // console.log("the id is", event.target.id.split("--")[1])
    }
})



applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("delete")) {
        const postId = event.target.id.split("__")[1];
        deletePost(postId)
            .then(response => {
                showPostList();
            })
    }
})


applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
        const postId = event.target.id.split("__")[1];
        getSinglePost(postId)
            .then(response => {
                showEdit(response);
            })
    }
})





applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
        const postId = event.target.id.split("__")[1];
        //collect all the details into an object
        const title = document.querySelector("input[name='postTitle']").value
        const url = document.querySelector("input[name='postURL']").value
        const description = document.querySelector("textarea[name='postDescription']").value
        const timestamp = document.querySelector("input[name='postTime']").value

        const postObject = {
            title: title,
            imageURL: url,
            description: description,
            userId: getLoggedInUser().id,
            timestamp: parseInt(timestamp),
            id: parseInt(postId)
        }

        updatePost(postObject)
            .then(response => {
                showPostList();
                showPostEntry();
            })
    }
})




applicationElement.addEventListener("click", giffyclick)




const startGiffyGram = () => {
    showPostList();
    showPostEntry();
    showNavBar();
    showFootBar();
}

startGiffyGram();