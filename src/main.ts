import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as fs from 'fs';
import helmet from 'helmet';
import * as http from 'node:http';
import * as https from 'node:https';
import { join } from 'path';
import { AppModule } from './app.module';
declare const module: any;

async function bootstrap() {

  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'x-www-form-urlencoded, multipart/form-data, Origin, X-Requested-With, Content-Type, Accept, Authorization, *',
    );
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, PATCH, DELETE, OPTIONS',
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).json({});
    }
    next();
  });
  await app.init();

 



 
  if(process.env.PRODUCTION)
  {
    https
    .createServer(
      {
        key: fs.readFileSync(join(__dirname, 'key.pem')),
        cert: fs.readFileSync(join(__dirname, 'cert.pem')),
      },
      server,
    )
    .listen(3000, 'api.blufy.ir', () => {
      console.log(`app is listening on port ${3000}`);
    });
  }
  else
  {
    http
    .createServer(server,
    )
    .listen(3000, () => {
      console.log(`app is listening on port ${3000}`);
    });
  }


  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }
}

bootstrap();

// fetch('https://app.blufy.ir:3001/feedback', {
//   headers: {
//     accept: '*/*',
//     'content-type':
//       'multipart/form-data; boundary=----WebKitFormBoundarydfZvqhvRoE8pthJO',
//     'sec-ch-ua':
//       '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"Windows"',
//   },
//   referrer: 'https://blufy.ir/',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: '------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="service[]"\r\n\r\nlogo-design\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="service[]"\r\n\r\ncorporate-website\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="service[]"\r\n\r\nstore-website\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="name"\r\n\r\nali\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="email"\r\n\r\nali.hassanzadeh78@gmail.com\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="mess"\r\n\r\ntest \r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="budget"\r\n\r\n16-20\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="attachments[]"; filename="firewatch.jpg"\r\nContent-Type: image/jpeg\r\n\r\n\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="attachments[]"; filename="INSIDE_shot_21.png"\r\nContent-Type: image/png\r\n\r\n\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO\r\nContent-Disposition: form-data; name="g-recaptcha-response"\r\n\r\n03ANYolqsiyigHu5HazY8trN6NjccPdjAlppeXS18pIGBlHxznuYlo92R6GVQKsoADricqcahQus27yb49avOdaiyeun4uOGVZfxQxaH3ycDZWxOQV4d2eBWcrTAQL626RYFhqWsHxirzNlauAn8TJiPQ4ApViWGRNLatDz0PLIHTJ7YRF80AWmCaI_gtUhWu1wJNWZO8xdTCtZBSb7OIPpg5UjqUIRjhB6aHC-9XbByU_IOjTVpAraSlaUHOvxG6LUnJom9kZcTUJu7-Amd1Ao4CSC1niqcVHGBK2cNcuwq9cJx09C2zjS070StNJR36oBQM1KhAZSLOsdbFhKdkKNR5MKD7rw66AkPfjkzSgKgdapjAZjyCmEm14foXF0PA_0VgJPDX703kdj00SS4t1LuLQ6sf-3GwORZKCQfiJ8brwXzvNG5KOG15spuL7zUvjikdJr0Rd2cOwvzmDpZcAI-NpQ2uRK6Qta3onMfedIofYMs5rc3XxcBJgg_VyoTaykynQNSTtzjxQ\r\n------WebKitFormBoundarydfZvqhvRoE8pthJO--\r\n',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'omit',
// });
