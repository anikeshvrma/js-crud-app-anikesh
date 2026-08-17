const registerForm=document.querySelector("#register-form");
const fullnameInput=document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

registerForm.addEventListener("submit",async (e) => {
    e.preventDefault();   //-----> Stop browswer default behaviors
    console.log("Form Submitted");

    const newUser = {
        fullname:fullnameInput.value ,
        email:emailInput.value.toLowerCase(),
        password: passwordInput.value,
    };

    console.log(newUser);


//! SEND NEWUSER TO DATABASE
await fetch("http://localhost:5000/users",{
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
        "Content-Type": "application/json",
    },
});

//! NAVIGATE TO ALL USERS PAGE
window.location.href = "AllUsers.html";
});