const { GraphQLClient } = require("graphql-request");
import 'regenerator-runtime/runtime';
console.log('Hello World');
/*
//Relpace Client assertion
const CLIENT_ASSERTION =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc2MjAwMzQsIm5iZiI6MTY0NzYyMDAzNCwiZXhwIjoxNjQ3NjIwMzM0LCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiI1Y2U3NWUyZDQ3MGRkZTQwMmI3MjA1NmNlMWExM2IzYyJ9.jRQMKtzQ1FHxZZ4-1alvq3PNcbNPi_A-TaffSSg02KSXAbn9RCICQyRrOvyo--fEjc8JK25pewuJUQA2jhmLIqaAnaDaGqOTWZQ38-7OI7QmCnIDrJT8jRoKTreA97Yy7XjJZKXpWT5hdD2B_bDiBCmFUV-wbQLCUrxMEktWp4o8-1ZXF1w1NWdx4vnrlAnSqUoI44b5F1dTawxb0utfW5YY00u_A0xwHidre0w7jN8gtphT6Dj2gCJhrTCfyLGx2JeyS0eYo-Vxg6W-Im-d7BHXBKVKOPG77r7hShbxaE530KtYHcTXuzRZ8KtdJDscSiyhcH2h16-oLF8bdjWlgL0pkrqTUJcr7K1hfhvRvS9UKUjWak4QhkJdD01MqtgRtjWd2LXAf26hnqFPfQ8n_WW34ZAmgGJgeoyQ8_q_l1yldjTrAeb0P9NmfFLHGd3r_o6rAyHYoY4CQSHsolwCjV-scCE580IyE9qALFkupn3AVuKdkJ9Y8_hBC2-rqPxVPdXD9kuqh3vvM9fgSA3DZzMuBfXhucS6L1EVb9BYP09KW8UYYnqU-PJUmRPIl5HsuOpB8MnozfFuofARlBFPtBTzK2aMfOwkfr4fkOzX36Vi_BpazG_36KDsjbmES5FOd92iqZEoQyXjldhyojEKkq7NDEibdBT22bjrMNtjX3Y";
const CLIENT_ID = "test-37d09f16-d5f5-4229-8b18-0e9616d37bc7";

async function retrieveTokenUsingClientAssertion(
    clientId,
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

//Whenever you need a new token, uncomment section below, it will generate a new token, then check console on the browser to get the token


const token = retrieveTokenUsingClientAssertion(
    CLIENT_ID,
    CLIENT_ASSERTION,
    "client_paymentrequest"
);
*/

//Replace with newly generated token
//const token = "kU2NhCiPQ--TB_0A9tDqweZg-Wf6APjspvtVLjUaN1g";


const paybutton = document.getElementById('pay-button');
paybutton.addEventListener("click", function () {
    console.log(token);
    const token = "0fanmeJjUSO1Ub06sTJb0to4mU-pVT1HlsQ0lGsIwoA";
    const graphQLClient = new GraphQLClient("https://api.stitch.money/graphql", {
        headers: { authorization: `Bearer ${token}` }
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
                    quantity: 1,
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

