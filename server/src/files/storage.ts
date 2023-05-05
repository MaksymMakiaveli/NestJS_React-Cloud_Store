import { diskStorage } from 'multer';
import { Request } from 'express';
import * as path from 'path';

const generateId = () =>
  Array(18)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');

const normalizeFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void,
) => {
  const fileExtName = file.originalname.split('.').pop();

  callback(null, `${generateId()}.${fileExtName}`);
};

export const fileStorage = diskStorage({
  destination: path.join(__dirname, '..', '..', 'uploads'),
  filename: normalizeFileName,
});
