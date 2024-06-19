import { Injectable } from '@nestjs/common';
import { CreateUnityDto } from './dto/create-unity.dto';
import { UpdateUnityDto } from './dto/update-unity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnityService {
  constructor(private readonly prisma: PrismaService) { }
  async paginate(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {

    const results = await this.prisma.unity.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search } },
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.unity.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });

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

  async create(createUnityDto: CreateUnityDto) {
    return await this.prisma.unity.create({ data: createUnityDto });
  }

  async update(id: bigint, updateUnityDto: UpdateUnityDto) {
    return await this.prisma.unity.update({
      where: { id },
      data: updateUnityDto,
    });
  }

  async remove(id: bigint) {
    return await this.prisma.unity.delete({
      where: { id }
    })
  }

  async findById(id: bigint) {
    return await this.prisma.unity.findFirstOrThrow({
      where: { id }
    })
  }
}
