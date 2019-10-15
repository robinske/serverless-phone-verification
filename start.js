/**
 *  Start Verification
 *
 *  This Function shows you how to send a verification token for Twilio Verify.
 *  Docs: https://www.twilio.com/docs/verify/api/verification
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
 *  - In properties, give your function a name and add a path of `start`
 *  - Copy the URL and add it to your index.html `fetch` inside `smsLoginTwilio()`
 */

exports.handler = function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Content-Type', 'application/json');
  
  // CORS support
  response.appendHeader('Access-Control-Allow-Origin', '*'); // * for testing, restrict to your website in prod!
  response.appendHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const client = context.getTwilioClient();
  const service = context.VERIFY_SERVICE_SID

  let channel = (typeof event.channel === 'undefined') ? "sms" : event.channel;
  let to = event.phone_number;

  // Optional, lookup/format phone number before sending it to the Verify channel
  // client.lookups.phoneNumbers(event.phone_number).fetch()
  //   .then(pn => {
  //     to = pn.phoneNumber;
  //   })
  //   .catch(error => {
  //     response.setBody({
  //       "success": false,
  //       "message": error
  //     })
  //     response.setStatusCode(400);
  //     callback(null, response);
  //   })

  client.verify.services(service)
    .verifications
    .create({to: to, channel: channel})
    .then(verification => {
      verification.success = true;
      response.setBody(verification);
      response.setStatusCode(200);
      callback(null, response);
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
