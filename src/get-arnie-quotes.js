const { httpGet } = require("./mock-http-interface");

const getArnieQuotes = async (urls) => {
  if (!Array.isArray(urls)) {
    return "Input should be an array";
  }

  if (Array.isArray(urls) && !urls.every((item) => typeof item === "string")) {
    return "Inputs in an array should be of type string";
  }
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
