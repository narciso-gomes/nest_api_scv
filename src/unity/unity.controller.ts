import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UnityService } from './unity.service';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';

@Controller('unity')
export class UnityController {
  constructor(private readonly unityService: UnityService) {}

  @Get('pages?')
  async pagination(@Request() request) {
    return await this.unityService.paginate(
      request.query.hasOwnProperty('page') ? request.query.page : 0,
      request.query.hasOwnProperty('size') ? request.query.size : 10,
      request.query.hasOwnProperty('sort') ? request.query.sort : 'name',
      request.query.hasOwnProperty('order') ? request.query.order : 'asc',
      request.query.hasOwnProperty('search') ? request.query.search : '',
    );
  }

  @Post()
  create(@Body() createUnityDto: CreateUnityDto) {
    return this.unityService.create(createUnityDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnityDto: UpdateUnityDto) {
    return this.unityService.update(+id, updateUnityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unityService.remove(+id);
  }
}
