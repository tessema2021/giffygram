
const loggedInUser = {
    id: 1,
    name: "Tessema",
    email: "ninafuchere@gmail.com",
    DateJoined: 1630514234395
}





export const getUsers = () => {

    return fetch("http://localhost:8088/users")
        .then(response => response.json())
    // // .then(parsedResponse => {
    // //     // do something with response here
    // //     return parsedResponse;
    // })
}
export const getPosts = () => {
    return fetch("http://localhost:8088/posts")
        .then(response => response.json())


}
