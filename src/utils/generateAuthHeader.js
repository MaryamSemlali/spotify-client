export default (clientID, clientSecret) => {
    let stringToEncode = clientID + ':' + clientSecret;
    let buff = new Buffer.from(stringToEncode);
    let base64data = buff.toString('base64');

    return 'Basic ' + base64data;
};
