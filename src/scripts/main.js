import { getUsers } from "./DataManager.js";

const allUsers = getUsers()
    .then(apiUsers => {
        console.log("allUsers", apiUsers)
    }

    )



alert("Tessema You Got It")
