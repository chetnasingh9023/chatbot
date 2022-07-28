const axios = require("axios");

const check_exists = async (options) => {
    try {
        let response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error in checking if user exists: ", error);
    }
    return null;
}

module.exports = check_exists;
