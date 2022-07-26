import {
  BadRequestException
} from '@nestjs/common';

export const UploadedFileFilter = (
  req,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/)) {
    const acceptFormat = 'jpg | jpeg | png | pdf';
    const err = new BadRequestException('فرمت های معتبر :' + acceptFormat);
    return callback(err, false);
  }

  callback(null, true);
};
