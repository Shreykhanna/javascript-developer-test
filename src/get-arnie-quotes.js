const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  const successKey = "Arnie Quote",
    failureKey = "FAILURE";

  const results = await Promise.all(
    urls.map(async (url) => {
      const { status, body } = await httpGet(url);
      const { message } = JSON.parse(body);

      return status === 200
        ? { [successKey]: message }
        : { [failureKey]: message };
    })
  );

  return results;
};

module.exports = {
  getArnieQuotes,
};
