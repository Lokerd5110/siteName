let signInBtn = document.querySelector('.sign-in-btn');
let signInForm = document.querySelector('.sign-in-popup');
let closeBtn = document.querySelector('.close-btn');

signInBtn.addEventListener("click", function() {
    signInForm.classList.remove("hidden");
    let passField = document.getElementById("password");
    let loginField = document.getElementById("username");
    passField.value = "";
    loginField.value = "";
});

closeBtn.addEventListener("click", function() {
    signInForm.classList.add("hidden");
});