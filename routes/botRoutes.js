// const { addEmployee } = require("../controllers/userControllers");
// const employeeRouter = require("express").Router();

// employeeRouter.post("/insert", addEmployee);

// module.exports = employeeRouter;

const botRouter = require("express").Router();
let processDialogFlowRequest = require("../controllers/dialogFlowControllers");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

botRouter.get("/", (req, res) => {
  let response = {
    message: "OK",
    status: 200,
    data: None,
  };
  return response;
});

botRouter.post("/wehbook", urlencodedParser, async (req, res) => {
  let response = {
    fulfillmentText: "Text response",
    fulfillmentMessages: [
      {
        text: {
          text: ["Sorry, something went wrong. Please try again later."],
        },
      },
    ],
    source: "<Text response>",
  };
  try {
    // const AiSensi =
    console.log("------------------------------");
    console.log("request from webhook");
    console.log(req.body);
    response = await processDialogFlowRequest(req, res);
  } catch (error) {
    console.log("Hii there");
    res.status(404).send({
      error: "Internal Server error",
    });
    console.log(error);
  }
});

module.exports = botRouter;
