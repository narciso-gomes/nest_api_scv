import { Injectable } from '@nestjs/common';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { UnityRepository } from './repository/unity.repository';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnityService {
  constructor(private readonly repository: UnityRepository, private readonly prisma: PrismaService) { }
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

  update(id: bigint, updateUnityDto: UpdateUnityDto) {
    return this.repository.update(id, updateUnityDto);
  }

  remove(id: bigint) {
    return this.repository.remove(id)
  }

  async findById(id: bigint) {
    return await this.prisma.unity.findFirstOrThrow({
      where: { id }
    })
  }
}
