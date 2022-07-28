require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const create_user_event = require("./routes/create_user_event");
const login = require("./routes/login");
const chat = require("./routes/chat");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public/static")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", socket => {
    console.log("a user connected");
    socket.on('create-user', async (usr_id) => {
        console.log("create-user event detected: " + usr_id);
        let usr_id_res = await create_user_event(usr_id);
        socket.emit('user-created', usr_id_res.user_id);
    });
    socket.on('login-user', async (usr_id) => {
        console.log("login event called: " + usr_id);
        let usr_id_res = await login(usr_id);
        console.log("login event response: " + usr_id_res.user_id);
        socket.emit('user-created', usr_id_res.user_id);
    });
    socket.on('user-message', async (data) => {
        console.log("Incoming chat message: {" + data.usr_id + ", " + data.ctx + ", " + data.msg + "}");
        socket.emit('msg-recieved', data.msg);
        let chat_res = await chat(data);
        console.log("Chat response: {" + chat_res.user_id + ", " + chat_res.response + "}");
        socket.emit('ai-res', chat_res.response);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () =>
    console.log(`Server is up and running on port ${port}...`)
);