const connection = require("../db/connect");
let {
  create_user,
  fetch_by_phone,
  fetch_user_by_id,
  fetch_user_by_phone,
} = require("./userControllers");

const processDialogFlowRequest = async (Aisensi) => {
  const wa_username = Aisensi.originalDetectIntentRequest.payload.AiSensyName;
  const phone_number =
    Aisensi.originalDetectIntentRequest.payload.AiSensyMobileNumber;
  if (phone_number[0] === "+") {
    phone_number = phone_number.slice(1, phone_number.length);
    console.log(phone_number);
  }
  const parameters = req.queryResult.intent.displayName;
  const intentDisplayName = Aisensi.queryResult.intent.displayName;

  let response = {
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
  let _user = await fetch_user_by_phone(phone_number);
  console.log("line no 33", _user);

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

module.exports = processDialogFlowRequest;
