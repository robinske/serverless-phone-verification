# Serverless Twilio Verify

This code shows how to use [Twilio Verify](https://twilio.com/docs/verify/api) and [Twilio Functions](https://www.twilio.com/console/functions/manage) for a serverless phone verification solution.

**Check out a [demo on Glitch](https://atlantic-vault.glitch.me/)**


## Pre-requisites
*  [Create a Verify Service](https://www.twilio.com/console/verify/services)
*  Add VERIFY_SERVICE_SID from above to your [Environment Variables](https://www.twilio.com/console/functions/configure)
*  Enable ACCOUNT_SID and AUTH_TOKEN in your [functions configuration](https://www.twilio.com/console/functions/configure)

Deploy two functions
1) ["Start"](start.js)
2) ["Check"](check.js)

How to deploy a Twilio Function
* [Create a new Function](https://www.twilio.com/console/functions/manage)
* Choose "Blank"
* Replace the code with the code in the template file
* In properties, give your function a name and add a relevant path (`start` or `check`)
* Copy the URL and add it to the appropriate index.html `fetch` call