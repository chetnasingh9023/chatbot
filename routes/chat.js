const chat_service = require('../service/chat.js');

const chat_config = (usr_id, ctx, msg) => {
    const options = {
        method: 'POST',
        url: `${process.env.url}/v1/waifu`,
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.api_key,
            'X-RapidAPI-Host': process.env.api_host
        },
        data: `{"user_id":"${usr_id}","message":"${msg}","from_name":"Girl","to_name":"Girl","situation":"${ctx}","translate_from":"auto","translate_to":"auto"}`
    };
    return options;
}

const chat = async (data) => {
    const options = chat_config(data.usr_id, data.ctx, data.msg);
    let response = await chat_service(options);
    return response;
}

module.exports = chat;