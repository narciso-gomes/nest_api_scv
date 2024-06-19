import { Injectable } from '@nestjs/common';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { UnityRepository } from './repository/unity.repository';

@Injectable()
export class UnityService {
  constructor(private readonly repository: UnityRepository) {}
  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const { results, totalItems } = await this.repository.paginate(
      page,
      size,
      sort,
      order,
      search,
    );

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);
    return {
      results,
      pagination: {
        length: totalItems,
        size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }
  create(createUnityDto: CreateUnityDto) {
    return this.repository.create(createUnityDto);
  }

  update(id: number, updateUnityDto: UpdateUnityDto) {
    return this.repository.update(id, updateUnityDto);
  }

  remove(id: number) {
    return `This action removes a #${id} unity`;
  }
}
