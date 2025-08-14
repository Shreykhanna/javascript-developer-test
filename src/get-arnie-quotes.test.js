const { getArnieQuotes } = require("./get-arnie-quotes");

const urls = [
  "http://www.smokeballdev.com/arnie0",
  "http://www.smokeballdev.com/arnie1",
  "http://www.smokeballdev.com/arnie2",
  "http://www.smokeballdev.com/arnie3",
];

test("expect no throws", () => {
  expect.assertions(1);
  expect(async () => await getArnieQuotes(urls)).not.toThrow();
});

test("responses to be correct", async () => {
  expect.assertions(5);

  const results = await getArnieQuotes(urls);

  expect(results.length).toBe(4);
  expect(results[0]).toEqual({ "Arnie Quote": "Get to the chopper" });
  expect(results[1]).toEqual({ "Arnie Quote": "MY NAME IS NOT QUAID" });
  expect(results[2]).toEqual({ "Arnie Quote": `What's wrong with Wolfie?` });
  expect(results[3]).toEqual({ FAILURE: "Your request has been terminated" });
});

// Added additional test to check the input is an array
test("should immediately return if the input is not an array", async () => {
  const url = "http://www.smokeballdev.com/arnie0";
  const results = await getArnieQuotes(url);
  expect(results).toEqual("Input should be an array");
});

// Added additonal test to check if the input is an array of type string
test("should immediately return if the input is an array but not of type string", async () => {
  const data = [1, 2, 3, 4, 5];
  const results = await getArnieQuotes(data);
  expect(results).toEqual("Inputs in an array should be of type string");
});

// Added additional test to check the return type of result
test("response returned should be promise", () => {
  const results = getArnieQuotes(urls);
  expect(results).toBeInstanceOf(Promise);
});

// Added additional test to check result is not empty
test("response returned should not be empty", async () => {
  const results = await getArnieQuotes(urls);
  expect(results.length).not.toBe(0);
});

// Added additional test to check the type of each result
test("responses should be of type object", async () => {
  const results = await getArnieQuotes(urls);
  expect(results[0]).toBeInstanceOf(Object);
  expect(results[1]).toBeInstanceOf(Object);
  expect(results[2]).toBeInstanceOf(Object);
  expect(results[3]).toBeInstanceOf(Object);
});

test("code to be executed in less than 400ms", async () => {
  expect.assertions(2);

  const startTime = process.hrtime();
  await getArnieQuotes(urls);
  const [seconds, nanos] = process.hrtime(startTime);

  expect(seconds).toBe(0);
  expect(nanos / 1000 / 1000).toBeLessThan(400);
});
