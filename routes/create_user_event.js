const create_user = require("../service/create_user");

var url = `${process.env.url}`;

const create_usr_config = (usr_id) => {
    const options = {
        method: 'PUT',
        url: url + `/v1/user/id/${usr_id}`,
        headers: {
            'content-type': 'application/json',
            user_id: usr_id,
            'X-RapidAPI-Key': `${process.env.api_key}`,
            'X-RapidAPI-Host': `${process.env.api_host}`
        },
        data: '{}'
    };
    return options;
}
const create_user_event = async (usr_id) => {
    const options = create_usr_config(usr_id);
    let response = await create_user(options);
    return response;
}
module.exports = create_user_event;