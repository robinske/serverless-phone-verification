/**
 *  Check Verification
 *
 *  This Function shows you how to check a verification token for Twilio Verify.
 *  Docs: https://www.twilio.com/docs/verify/api/verification-check
 *
 *  Pre-requisites
 *  - Create a Verify Service (https://www.twilio.com/console/verify/services)
 *  - Add VERIFY_SERVICE_SID from above to your Environment Variables (https://www.twilio.com/console/functions/configure)
 *  - Enable ACCOUNT_SID and AUTH_TOKEN in your functions configuration (https://www.twilio.com/console/functions/configure)
 * 
 *  Deploy
 *  - Create a new Function (https://www.twilio.com/console/functions/manage)
 *  - Choose "Blank"
 *  - Replace the code with the code below
 *  - In properties, give your function a name and add a path of `check`
 *  - Copy the URL and add it to your index.html `fetch`
 */

exports.handler = function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  
  // CORS support
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const client = context.getTwilioClient();
  const service = context.VERIFY_SERVICE_SID

  // strip special characters, construct E.164 number
  // see: https://www.twilio.com/docs/glossary/what-e164
  let cc = `${event.country_code.replace(/\W/g, '')}`;
  let pn = `${event.phone_number.replace(/\W/g, '')}`;
  let to = `+${cc + pn}`

  let code = event.verification_code;
          
  client.verify.services(service)
    .verificationChecks
    .create({to: to, code: code})
    .then(check => {
      if (check.status == "approved") {
        check.success = true;
        response.setBody(check);
        response.setStatusCode(200);
        callback(null, response);
      } else {
        response.setBody({
          "success": false,
          "message": "Incorrect code."
        })
        callback(null, response);
      }
     
    })
    .catch(error => {
      response.setBody({
        "success": false,
        "message": error
      })
      response.setStatusCode(400);
      callback(null, response);
    });
};