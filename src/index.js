
const { GraphQLClient } = require("graphql-request");
console.log('Hello World');
import 'regenerator-runtime/runtime';
const fs = require('fs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto"); // used for generating the cryptographically unique JWT id
const clientId = 'test-37d09f16-d5f5-4229-8b18-0e9616d37bc7';
//Relpace Client assertion
const paybutton = document.getElementById('pay-button');
async function retrieveTokenUsingClientAssertion(
    clientAssertion,
    scopes
) {
    const body = {
        grant_type: "client_credentials",
        client_id: clientId,
        scope: scopes,
        audience: "https://secure.stitch.money/connect/token",
        client_assertion_type:
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: clientAssertion
    };
    const bodyString = Object.entries(body)
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
    const response = await fetch("https://secure.stitch.money/connect/token", {
        method: "post",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: bodyString
    });
    const responseBody = await response.json();
    console.log("Tokens: ", responseBody);
    return responseBody.access_token;
}

function getClientAssertion() {
    const filename = './certificate.pem';
    console.log('clientid is :', clientId);

    console.log('Generating private_key_jwt for certificate ', filename);
   const pemCert = fs.readFileSync(filename,{encoding:'utf8', flag:'r'}).toString('utf8');
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
    console.log('jwdid is ',jwtid)

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
console.log('options is here', options);
console.log('pemCert is', pemCert);
    const clientAssert = jwt.sign({}, pemCert, options);
    console.log(`Token:\n${clientAssert}`);
    return clientAssert;
}
/*
function getKeyId(cert) {
    const lines = cert.split('\n').filter(x => x.includes('localKeyID:'))[0];
    const result = lines.replace('localKeyID:', '').replace(/\W/g, '');
    return result;
}
*/
paybutton.addEventListener("click", async function () {
    const CLIENT_ASSERTION = getClientAssertion();
    //Whenever you need a new token, uncomment section below, it will generate a new token, then check console on the browser to get the token
    let token = await retrieveTokenUsingClientAssertion(
        CLIENT_ASSERTION,
        "client_paymentrequest"
    );

    console.log("access token =", token);
    //const token = "0W2pSqV63Od-r29XzbMEAf6ge4daUnr6hswlI4txT0cc";
    //const token = '3BLcU0KMZ_rMCFhkkRFTCBCz0mXgYnJj7Bv4en5y-44';
    let authheaders = { authorization: `Bearer ${token}` };
    console.log(authheaders);
    const graphQLClient = new GraphQLClient("https://api.stitch.money/graphql", {
        // headers: { authorization: `Bearer ${token.access_token}` }
        headers: authheaders
    });
    const createPaymentRequestMutation = `
     mutation CreatePaymentRequest(
         $amount: MoneyInput!,
         $payerReference: String!,
         $beneficiaryReference: String!,
         $externalReference: String,
         $beneficiaryName: String!,
         $beneficiaryBankId: BankBeneficiaryBankId!,
         $beneficiaryAccountNumber: String!) {
       clientPaymentInitiationRequestCreate(input: {
           amount: $amount,
           payerReference: $payerReference,
           beneficiaryReference: $beneficiaryReference,
           externalReference: $externalReference,
           beneficiary: {
               bankAccount: {
                   name: $beneficiaryName,
                   bankId: $beneficiaryBankId,
                   accountNumber: $beneficiaryAccountNumber
               }
           }
         }) {
         paymentInitiationRequest {
           id
           url
         }
       }
     }`;

    let urlResponse = ''

    graphQLClient
        .request(createPaymentRequestMutation, {
            amount: {
                quantity: 10,
                currency: "ZAR"
            },
            payerReference: "Joe-Fizz-01",
            beneficiaryReference: "KombuchaFizz",
            externalReference: "example-e32e5478-325b-4869-a53e-2021727d2afe",
            beneficiaryName: "FizzBuzz Co.",
            beneficiaryBankId: "fnb",
            beneficiaryAccountNumber: "123456789"
        })
        .then((data) => {
            console.log("THE DATA: ",
                data.clientPaymentInitiationRequestCreate.paymentInitiationRequest
            );



            urlResponse = data.clientPaymentInitiationRequestCreate.paymentInitiationRequest;
            console.log(urlResponse)
            const url = `${urlResponse.url}?redirect_uri=http%3A%2F%2Flocalhost%3A3000`;
            window.location.href = url;



        });

});


