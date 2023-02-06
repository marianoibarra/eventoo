const { OAuth2Client } = require("google-auth-library");

exports.verifyGoogleAuth = async (credential) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID, 
  });
  const payload = ticket.getPayload();

  return payload;
};
