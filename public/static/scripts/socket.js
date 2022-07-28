function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(cname) {
    let cookie = getCookie(cname);
    if (cookie != "") {
        return true;
    } else {
        return false;
    }
}

var socket = io();
//sending usr msg to server
var snd_btn = document.getElementById("button-addon2");
snd_btn.addEventListener("click", function (e) {
    let input = document.getElementById("input");
    e.preventDefault();
    if (input.value && sessionStorage.getItem("ctx") && checkCookie("usr_id")) {
        let data = { usr_id: getCookie("usr_id"), ctx: sessionStorage.getItem("ctx"), msg: input.value };
        socket.emit("user-message", data);
        input.value = "";
    }
});

var signup_btn = document.getElementById("signup-btn");
signup_btn.addEventListener("click", function (e) {
    let usr_nm = document.getElementById("usr_nm");
    e.preventDefault();
    console.log(usr_nm.value);
    if (usr_nm.value) {
        socket.emit('create-user', usr_nm.value);
    }
});

socket.on('user-created', function (usr_id) {
    console.log("user created with id: ", usr_id);
    let time = new Date();
    time.setTime(time.getTime() + (1 * 3600 * 1000));
    document.cookie = `usr_id=${usr_id};expires=${time.toUTCString()};path=/;`;
    let login_signup = document.getElementById("login-signup");
    let gender_context = document.getElementById("gender-context");
    login_signup.setAttribute("hidden", true);
    gender_context.removeAttribute("hidden");
});

var login_btn = document.getElementById("login_btn");
login_btn.addEventListener("click", function (e) {
    let usr_nm = document.getElementById("usr_nm");
    e.preventDefault();
    console.log(usr_nm.value);
    if (usr_nm.value) {
        socket.emit('login-user', usr_nm.value);
    }
});

// dynamically add new message by user to the chat
// server acknowleding the message
socket.on("msg-recieved", function (msg) {
    console.log("create element called with msg: ", msg);
    let chat = document.getElementById("messages");
    let chat_container = document.createElement("li");
    chat_container.style.listStyle = "none";
    chat_container.className = "col-4 offset-8";
    let new_msg = document.createElement("p");
    new_msg.className = "text-light fs-3 rounded-pill p-3 chat-msg-usr";
    new_msg.innerHTML = msg;
    chat.appendChild(chat_container);
    chat_container.appendChild(new_msg);
    let last_chat = document.querySelectorAll(".chat-msg-usr");
    console.log("chats by user: ", last_chat);
    let last = last_chat[last_chat.length - 1];
    last.scrollIntoView();
});

// dynamically add new message by AI to the chat
// server acknowleding the message
socket.on("ai-res", function (msg) {
    console.log("create element called with msg: ", msg);
    let chat = document.getElementById("messages");
    let chat_container = document.createElement("li");
    chat_container.style.listStyle = "none";
    chat_container.className = "col-auto";
    let new_msg = document.createElement("p");
    new_msg.className = "text-light fs-3 rounded-pill p-3 chat-msg-ai";
    new_msg.innerHTML = msg;
    chat.appendChild(chat_container);
    chat_container.appendChild(new_msg);
    let last_chat = document.querySelectorAll(".chat-msg-ai");
    console.log("chats by ai: ", last_chat);
    let last = last_chat[last_chat.length - 1];
    last.scrollIntoView();
})