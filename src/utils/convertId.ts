import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function convertId(id: string) {
  try {
    const res = new Types.ObjectId(id);
    return res;
  } catch (error) {
    throw new BadRequestException('Invalid Id Format');
  }
}
