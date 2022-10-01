const connection = require("../db/connect");
let {
  create_user,
  fetch_by_phone,
  fetch_user_by_id,
  fetch_user_by_phone,
  update_user_interests,
  update_user_full_name,
  update_user_mail,
  update_user_about,
  update_user_linkedin_url,
  get_interests_of_user,
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
    // response.fulfillmentMessages[0].text.text[0] = (
    //   get_response("welcome_new_user") if(new_u
    // );
    // please check what exact statement will be there in this block line no. 38;
  } else if (intentDisplayName === "update_interests") {
    let i;
    if ((data = parameters.get("interests"))) {
      await update_user_interests(_user_id); //please check parameter to add
      response.fulfillmentMessages[0].text.text[0] =
        get_response("interests_updated");
    } else {
      response.fulfillmentMessages[0].text.text[0] =
        get_response("invalid_interests");
    }
  } else if (
    intendDisplayName in ["full_name", "email", "about", "linkedin_url"]
  ) {
    // verify this line 53 line no. in python
    // verify parameter list
    if ((data = parameters.get(intentDisplayName))) {
      //verify and also check parameters.get() function
      if (!_user[intentDisplayName]) {
        //please do correction
        let _success = false;

        if (intentDisplayName === "full_name") {
          if (isinstance(data, list)) {
            data = data[0].get("name");
          } else if (isinstance(data, dict)) {
            data = data.get("name");
          }
          update_user_full_name(_user_id, data || String(wa_username));
          _success = true;
        } else if (intentDisplayName === "email") {
          update_user_mail(_user_id, data);
          _success = true;
        } else if (intentDisplayName === "about") {
          update_user_about(_user_id, data);
          _success = true;
        } else if (
          intentDisplayName === "linkedin_url" &&
          check_linkedin_url(data)
        ) {
          update_user_linkedin_url(_user_id, data);
          _success = true;
        }
        if (_success) {
          response.fulfillmentMessages[0].text.text[0] = get_response(); // please check what will be the parameters line no. 81
        } else {
          response.fulfillmentMessages[0].text.text[0] = get_response(); // please check what will be the parameters line no.83
        }
      } else {
        let _ = {
          full_name: "name",
          email: "email address",
          about: "description",
        };
        response.fulfillmentMessages[0].text.text[0]; // please check what will be the statement of line no.94
      }
    } else {
      response.fulfillmentMessages[0].text.text[0] = get_response(); // please check what will be the parameters line no.97
    }
  } else if (intentDisplayName === "find_connections") {
    const _matching_user = find_matching_user(_user_id);
    if (_matching_user) {
      // let u_interests =[
      //   interest["name"]
      //   for interest in
      // ] please correct this statement by refering line no. 102 to 105
      response.fulfillmentMessages = [
        {
          text: {
            text: [
              //please put statement refering line no.110 to 113 as there are no buit-in string formatting in javascript
            ],
          },
        },
        {
          quickReplies: {
            quickReplies: ["Let's connect", "Find connection"],
          },
        },
      ];
      return response;
    } else {
      response.fulfillmentMessages[0].text.text[0] =
        "Sorry, we couldn't find any connections for you.Try again later.";
    }
  } else if (intentDisplayName in ["accept_connection", "reject_connection"]) {
    const pending_connection = fetch_connection_request(_user_id);
    if (pending_connection) {
      const pending_user = fetch_user_by_id(pending_connection["from_user_id"]); //verify this with line no. 135
      const msg = "";
      if (intentDisplayName === "accept_connection") {
        accept_connection_request(pending_connection["id"]);
        msg = "you have accepted invite"; //please correct the statement refering line no.141 to 146
        if (config["TOGGLE_AISENSY"] === "ON") {
          const _interests = get_interests_of_user(_user["id"]);
          //continue from line no.150
        }
      }
    }
  }
};

module.exports = processDialogFlowRequest;
