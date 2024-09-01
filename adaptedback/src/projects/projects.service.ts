import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  create(createProjectDto: CreateProjectDto, id: number) {
    const project = this.projectRepository.create({
      ...createProjectDto,
      login: { id },
    });
    this.projectRepository.save(project);
    return project;
  }

  async findAll(id: number) {
    const usersProjects = await this.projectRepository.find({
      where: { login: { id } },
      relations: ['login', 'tasks'],
    });
    return usersProjects;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} - ${updateProjectDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
