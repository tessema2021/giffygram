import {
    getUsers, getPosts, usePostCollection,
    createPost, setLoggedInUser,
    deletePost, getSinglePost, getLoggedInUser,
    updatePost, logoutUser, loginUser, registerUser, postLike
} from "./data/DataManager.js";
import { NavBar } from "./nav/NavBar.js";
import { PostEntry } from "./feed/postEntry.js"
import { PostList } from "./feed/postlist.js";
import { footbar } from "./footer/footer.js";
import { PostEdit } from "./feed/postEdit.js";
import { LoginForm } from "./auth/loginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";

// const allUsers = getUsers()
//     .then(apiUsers => {
//         //console.log("allUsers", apiUsers)
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



const checkForUser = () => {
    if (sessionStorage.getItem("user")) {
        //this is expecting an object. Need to fix
        setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
        startGiffyGram();
    } else {
        //show login/register
        showLoginRegister();
        //console.log("showLogin")
    }
}




const showLoginRegister = () => {
    showNavBar();
    const entryElement = document.querySelector(".entryForm");
    //template strings can be used here too
    entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
    //make sure the post list is cleared out too
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = "";
}
// const showCancel = (postObj) => {
//     const entryElement = document.querySelector(".entryForm");
//     entryElement.innerHTML = PostEdit(postObj);
// }



const applicationElement = document.querySelector(".giffygram");


applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("like")) {
        const likeObject = {
            postId: parseInt(event.target.id.split("__")[1]),
            userId: getLoggedInUser().id
        }
        postLike(likeObject)
            .then(response => {
                showPostList();
            })
    }
})


applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
        sessionStorage.clear();
        checkForUser();
        //registerUser();
    }
})




applicationElement.addEventListener("click", event => {
    event.preventDefault();

    if (event.target.id === "login__submit") {

        //collect all the details into an object
        const userObject = {
            name: document.querySelector("input[name='name']").value,
            email: document.querySelector("input[name='email']").value
        }
        loginUser(userObject)
            .then(dbUserObj => {
                if (dbUserObj) {
                    sessionStorage.setItem("user", JSON.stringify(dbUserObj));
                    startGiffyGram();
                } else {
                    //got a false value - no user
                    const entryElement = document.querySelector(".entryForm");
                    //console.log("enteryElement", entryElement)
                    entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
                }
            })
    }
})


const giffyclick = (event) => {
    //console.log("what was clicked", event.target)
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
            userId: getLoggedInUser().id,
            timestamp: Date.now()
        }

        // be sure to import from the DataManager
        createPost(postObject)
            .then(dbResopnse => {
                showPostList();
            })
    }
})


applicationElement.addEventListener("click", event => {
    if (event.target.id === "logout") {
        logoutUser();
        console.log(getLoggedInUser());
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
checkForUser();
    //startGiffyGram();