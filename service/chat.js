const axios = require("axios");

const chat = async (options) => {
    try {
        let response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error in doing chat: ", error);
    }
    return null;
}

module.exports = chat;
