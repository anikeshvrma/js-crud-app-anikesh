const userscontainer = document.querySelector("#users-container");

console.log(userscontainer);



async function getAllUsers() {

    try {

        let resp = await fetch("http://localhost:5000/users");

        let data = await resp.json();

        displayUsers(data);

    } catch (error) {

        console.log(error);

    }
}

getAllUsers();

function displayUsers(users) {

    console.log(users);

    users.forEach((user) => {

        let { fullname, email, password, id } = user;

        const userDiv = document.createElement("div");

        userDiv.className ="user-card";

        userDiv.id = `user-${id}`;

        userDiv.innerHTML = `
           <figure class="user-avatar">
                ${fullname[0].toUpperCase()}
           </figure>

                <h3>${fullname}</h3>

                <p>${email}</p>

                <p>${password}</p>
                <button 
                
                class="edit-btn"
                onClick="editUser('${id}')">
                Edit
               </button>
                <button

                 class="delete-btn" 
                 onClick="deleteUser('${id}')">
                 Delete
                 </button>
        `;
        userscontainer.append(userDiv);
    });
}

//=================EDIT USER====================

async function editUser(id) {

    try {

        //Exixting user ka data lao
        const response = await fetch(
            `http://localhost:5000/users/${id}`
        );

        const user = await response.json();

        //New Fullname
        const newFullname = prompt(
            "Enter new fullname",
            user.fullname
        );

if (newFullname === null) {
            return;
        }   


        //NEW EMAIL
        const newEmail = prompt(
            "Enter new email",
            user.email
        );

        if (newEmail === null) {
            return;
        }   


        //NEW PASSWORD
        const newPassword = prompt(
            "Enter  password",
            user.password
        );

        if (newPassword === null) {
            return;
        }   

        //PUT REQUEST
        const updatedResponse = await fetch(
            `http://localhost:5000/users/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullname: newFullname,
                    email: newEmail,
                    password: newPassword
                })
            }
        );



        if (updatedResponse.ok) {

            alert("User Updated ");

            //Updated User card dobara load karo
          getAllUsers();

        } else {

            alert(" User update Failed");

        }

    } catch (error) {

        console.log(error);

    }
}


//=================DELETE USER====================

async function deleteUser(id) {

    await fetch(
        `http://localhost:5000/users/${id}`,
        {
            method: "DELETE"
        }
    );

alert("User Deleted");

getAllUsers();
}