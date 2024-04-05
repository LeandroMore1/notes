export const options = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }
  
  export const corsOpt = {
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', '*'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }