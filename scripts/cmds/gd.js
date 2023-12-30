const axios = require('axios');

module.exports = {
  config: {
    name: "gd",
    aliases: ["geometrydash"],
    version: "1.0",
    author: "LiANE",
    shortDescription: {
      en: "Fetch information from Geometry Dash API."
    },
    longDescription: {
      en: "Fetch user or level information from Geometry Dash API."
    },
    category: "games",
    guide: {
      en: "{pn} [user | level] <username or levelID>: Fetch GD information."
    }
  },

  langs: {
    en: {
      invalidArg: "❌ | Invalid argument. Please use 'user' or 'level'.",
      apiError: "❌ | Error fetching information from Geometry Dash API.",
    }
  },

  onStart: async function ({ message, args, getLang }) {
    try {
      const argType = args[0];
      const inputValue = args[1];

      if (!argType || !inputValue) {
        return message.reply(getLang("invalidArg"));
      }

      let apiEndpoint, responseType;
      if (argType.toLowerCase() === "user") {
        apiEndpoint = `https://lianeapi.onrender.com/gd/user?username=${inputValue}`;
        responseType = "User";
      } else if (argType.toLowerCase() === "level") {
        apiEndpoint = `https://lianeapi.onrender.com/gd/level?levelID=${inputValue}`;
        responseType = "Level";
      } else {
        return message.reply(getLang("invalidArg"));
      }

      const response = await axios.get(apiEndpoint);
      message.reply(response.data.message);
    } catch (error) {
      console.error(error);
      message.reply(getLang("apiError"));
    }
  }
};

