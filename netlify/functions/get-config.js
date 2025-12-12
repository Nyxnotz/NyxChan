exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      modPassword: process.env.MOD_PASSWORD
    })
  };
};
