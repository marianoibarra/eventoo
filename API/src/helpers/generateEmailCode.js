function generateEmailCode() {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);
  return [String(Math.floor(100000 + Math.random() * 900000)), expiration];
}

module.exports = generateEmailCode