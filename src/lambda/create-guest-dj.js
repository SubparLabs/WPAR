const axios = require("axios");
const updateGuestUrl = "https://stream.subpar.fm/api/station/1/streamer/24";

const chars =
  "!@$%&abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@$%&";

function generateTempPassword() {
  return new Array(12).fill(1).reduce((prev) => {
    const aChar = chars.charAt(Math.floor(Math.random() * chars.length));
    return prev + aChar;
  }, "");
}

function disconnectDJ() {
  axios({
    method: "POST",
    url: "https://stream.subpar.fm/api/station/1/backend/disconnect",
    headers: {
      "X-API-Key": process.env.SUBPAR_API_KEY,
    },
  })
  .then((response) => {
    return response.data;
  })
  .catch((err) => {
    console.log(err);
  })
}

exports.handler = (event, context, callback) => {
  const displayName = event.queryStringParameters.n || "anon";
  const password = generateTempPassword();

  axios({
    method: "PUT",
    url: updateGuestUrl,
    headers: {
      "X-API-Key": process.env.SUBPAR_API_KEY,
    },
    data: {
      streamer_password: password,
      display_name: displayName,
      is_active: true,
    },
  })
    .then((res) => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ name: "guest", password }),
      });
    })
    .catch((err) => {
      callback(err);
    });
};
