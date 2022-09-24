const connection = require("../db/connect");
const {
  create_user,
  fetch_by_phone,
  fetch_user_by_id,
  fetch_user_by_phone,
} = require("./userControllers");

const processDialogFlowRequest = async (req, res) => {
  let wa_username = req.body.originalDetectIntentRequest.payload,
    AiSensyName;
  let phone_number =
    req.body.originalDetectIntentRequest.payload.AiSensyMobileNumber;
  if (phone_number[0] === "+") {
    phone_number = phone_number.slice(1, phone_number.length());
  }
  let parameters = req.queryResult.intent.displayName;
  let intentDisplayName = req.body.queryResult.intent.displayName;

  const response = {
    fulfillmentText: "Text response",
    fulfillmentMessages: [
      {
        text: {
          text: ["Sorry, something went wrong.\nPlease try again later."],
        },
      },
    ],
    source: "<Text response>",
  };
  const _user = await fetch_user_by_phone(phone_number);
  if (!_user) {
    await create_user(phone_number);
    _user = await fetch_user_by_phone(phone_number);
    new_user = true;
  } else {
    new_user = false;
    const _user_id = _user.id;
  }
  if (intentDisplayName === "hello") {
    response.fulfillmentMessages[0].text.text[0];
  }
};

module.exports = { processDialogFlowRequest };
