import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

// Some example code for developing the REST version of the API

declare global {
    namespace Express {
      interface Request {
        key: string
      }
    }
  }

// Required logic for integrating with Express
const app = express();

function error(status: any, msg: string, res: Response) {
    var err: Error = new Error(msg);
    res.status = status;
    return err;
  }
  
  app.use('/', function (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    const key: string = req.query['api-key'] as string;

    // ...or get from req.headers['api-key'] if you'd prefer that solution
  
    // Check if key is present
    if (!key) return next(error(400, 'api key required', res));
  
    // Check if key is invalid
    // if (/* api key invalid */) return next(error(401, 'invalid api key', res))
  
    // Proceed
    req.key = key;
    next();
  });
  
  // example: http://localhost:3000/countries
  app.get('/countries', function (req: Request, res: Response, next: NextFunction) {
    res.send([{
      flag: "https://url.com/flag.svg",
      name: "Brazil",
      timezone: "UTC-5",
      region: "South America",
      code: "BR"
    }]);  
  });

  // example: http://localhost:3000/countries/:code/?api-key=foo
app.get('/api/countries/:code', function(req: Request, res: Response, next: NextFunction){
    const code : string = req.params.code;
  
    // Filter the countries from the cache

    // res.send(filteredCountries);    
  });