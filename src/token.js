'use strict';

/** 
 * This sample generates a short lived client JWT for use on Stitch SSO's token
 * endpoint. To run this sample, please run npm install, and then 
 * `npm run generate-jwt -- $CLIENT_ID $PATH_TO_PEM_CERT` where $CLIENT_ID is the 
 *  client id that was provided to you, and $PATH_TO_PEM_CERT is a path to the 
 *  cert that was provided to you in the confidential client
 */

const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto"); // used for generating the cryptographically unique JWT id

/*
if (process.argv.length < 4) {
  console.error('Expected command line argument to contain first your client id and then the path to your PEM certificate');
  return;
}
*/
// Client id is the second to last argument 
const clientId = 'test-37d09f16-d5f5-4229-8b18-0e9616d37bc7';
// Assume filename comes last
const filename = '../certificate.pem';
console.log('clientid is :', clientId);

console.log('Generating private_key_jwt for certificate ', filename);

const pemCert = fs.readFileSync(filename).toString('utf-8');

function getKeyId(cert) {
  const lines = cert.split('\n').filter(x => x.includes('localKeyID:'))[0];
  const result = lines.replace('localKeyID:', '').replace(/\W/g, '');
  return result;
}

const issuer = clientId;
const subject = clientId;
const audience = 'https://secure.stitch.money/connect/token';
const keyid = getKeyId(pemCert);
const jwtid = crypto.randomBytes(16).toString("hex");

const options = {
  keyid,
  jwtid,
  notBefore: "0",
  issuer,
  subject,
  audience,
  expiresIn: "5m", // For this example this value is set to 5 minutes, but for machine usage should generally be a lot shorter 
  algorithm: "RS256"
};

const token = jwt.sign({}, pemCert, options);
console.log(`Token:\n${token}`);

