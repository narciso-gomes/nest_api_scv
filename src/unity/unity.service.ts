import { Injectable } from '@nestjs/common';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';

@Injectable()
export class UnityService {
  create(createUnityDto: CreateUnityDto) {
    return 'This action adds a new unity';
  }

  findAll() {
    return `This action returns all unity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} unity`;
  }

  update(id: number, updateUnityDto: UpdateUnityDto) {
    return `This action updates a #${id} unity`;
  }

  remove(id: number) {
    return `This action removes a #${id} unity`;
  }
}
