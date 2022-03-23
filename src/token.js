async function retrieveTokenUsingClientAssertion(clientId, clientAssertion, scopes) {
    const CLIENT_ASSERTION =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc1Mjk1NTcsIm5iZiI6MTY0NzUyOTU1NywiZXhwIjoxNjQ3NTI5ODU3LCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiIwOTFkMjdmYWMwMjQ2YWY2NDQ0NzBkYjljZmQxY2YxMyJ9.m24panWBK8Xv5ucUFWzAI14K2qvH0r4YLfPgRqZvanmZgdEfoutwjj23T95mWLb8tbCGTFNH3rDvkopvvUUgn8MjY8IutHIAqwAgnTKNzlYedGbClGC1DqzoiAyyYHfABLR7YoqkI3FUHH8mBuh7k7ZP1PlahSyKMV9cRcnDynaXqHOHTEBXyW8RrHLs7twN1dtpEv2nEDlW_OHqHC2C_BodCFNOEduicfCqc-sBu0V6JvMVjZlhOERqp2sSj00Xr8dausRxcjA01-JydYZB-gWqLdTKqnuRcTIp-goqQ_imINH4kxlg5UJav0wTDhfoOE1awGy_eQrItJjHjGNzIuHxq_LtaTPynciGw_lGMuDJAMM9Io_2JbVWqewgYFqH3B3xsU-VB9qYYrQgpQ0-Oqj-ga_MTrQ9lw029iVW16x5UfJThKzBcZa8aqlT3GMsLeer8Nw18n6XY_lC0FDRE77oSJhGQRocRCXzGN-d5hhYtT2Bzha5rQR3YIKOvZD5ctgyokf2wqb5lJPUZnnJh8xhSQ7q6Jlu8VMmsyidUeTfIKMJabxaGW5erIhwUOST5XbyjIii3CkHMDntRG5VFGhh_rlmIqV7-N08cwpto9hYKKMU-DURscUv5LFDxGP773Bpp8R6sCXUQIXbMnhOhYa-fEXWb9yTR3Mbb-_U_T4";
const CLIENT_ID = "test-37d09f16-d5f5-4229-8b18-0e9616d37bc7";

async function retrieveTokenUsingClientAssertion(
    clientId,
    clientAssertion,
    scopes
){
    
    const body = {
        grant_type: 'client_credentials',
        client_id: 'test-37d09f16-d5f5-4229-8b18-0e9616d37bc7',
        scope: scopes.join(' '),
        audience: 'https://secure.stitch.money/connect/token',
        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        client_assertion: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkUzMDZBOTg4NDIwNjZBQkU5QzQ1QjQ0MjIyNTU0NjlFNTMwNEE2RTQifQ.eyJpYXQiOjE2NDc1MzAxMDMsIm5iZiI6MTY0NzUzMDEwMywiZXhwIjoxNjQ3NTMwNDAzLCJhdWQiOiJodHRwczovL3NlY3VyZS5zdGl0Y2gubW9uZXkvY29ubmVjdC90b2tlbiIsImlzcyI6InRlc3QtMzdkMDlmMTYtZDVmNS00MjI5LThiMTgtMGU5NjE2ZDM3YmM3Iiwic3ViIjoidGVzdC0zN2QwOWYxNi1kNWY1LTQyMjktOGIxOC0wZTk2MTZkMzdiYzciLCJqdGkiOiI3MzQwYzJmMTNmZDUzZGVkOTZkZGIwMjk2NzI1ZTZiZCJ9.ZhhqL0ldjpkZWI9cV3PvAKi3yNeAePoqMouBkE9EoSqyBY3CHi23RzQUJJxyvX0OdBDzFRhP-B51te50jwJpmCirkD3V31Qi11-KF8dx2bMdVdk2ZY7LUIgSy8wludME4Bv-VmJ7QT6DFNpBQB8QcrP7mI-o75JfQcw6ziQDRq1u0fqC0KWnTROebjusD3fLPg_r5wT9nuGtEFvRUxxADyaYh-B0jepQ516N9u8PkIv8C5SNIaWveypqJVSVugbx9AtHosgOZlKNf4iQD_YMV7r_wwwohMGthVF7Bq3fsJPcNMHce6DL8PqPQQUK7cOTpVCI5p62Ne-fJPMp0HODaoT-w2c9EvagG1VJx0BFRzkcNtQ2x4eBKBF5hYuoQ4G1povJXpYqEsJYPaLS35wMkD4x49Q9qVg_ViA2u0SweurVVR2ZN-FeON_8MloDnXsT_hgAJgmBT7eFZ7z7CULEimSkBlz-isG_KGxnLcojwKofQcPkhwbP3nCgWKuRk2CM4J273woffyoP5jb2CR9FRILjidzw_VlrZI9zKHiapLiNs-IN1qHe_f1fcJ4NK1HPxBLyxuucPanYG8ffVPmoLmW9RhRiE3_sWiFl9742aarYVIgCE1roBZbopfX82RWojxB29HjGaRbbA1uJTWIkBRiOomlhjj1LGrSFEoxXdbU'
    };
    const bodyString = Object.entries(body).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
    const response = await fetch('https://secure.stitch.money/connect/token', {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: bodyString,
    });
    const responseBody = await response.json();
    console.log('Tokens: ',  responseBody);
    return responseBody;
}
const token = retrieveTokenUsingClientAssertion(
    CLIENT_ID,
    CLIENT_ASSERTION,
    "client_paymentrequest"
   );
}
