exports.verifyApiKey = async (req, res, next) => {
  try{
    const apiKey = req.headers['api-key'];
    if(apiKey === process.env.API_KEY){
      next();
    } else {
      throw new Error('Invalid API Key');
    }
  } catch(e){
    res.status(400).json(
      {
        status: 'fail',
        message: e.message
      }
    );
  }
}