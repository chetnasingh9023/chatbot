const check_exists = require("../service/check_exits");

var url = `${process.env.url}`;

const login_config = (usr_id) => {
    const options = {
        method: 'GET',
        url: url + `/v1/user/id/${usr_id}`,
        headers: {
            'X-RapidAPI-Key': `${process.env.api_key}`,
            'X-RapidAPI-Host': `${process.env.api_host}`
        }
    };
    return options;
}

const login = async (usr_id) => {
    const options = login_config(usr_id);
    let response = await check_exists(options);
    return response;
}

module.exports = login;