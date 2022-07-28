const axios = require("axios");

const create_user = async (options) => {
    try {
        let response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error in creating user: ", error);
    }
}

module.exports = create_user;