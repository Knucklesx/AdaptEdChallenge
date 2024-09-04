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

  async create(createProjectDto: CreateProjectDto, id: number) {
    const project = this.projectRepository.create({
      ...createProjectDto,
      login: { id },
      tasks: [],
    });
    await this.projectRepository.save(project);
    return project;
  }

  async findAll(id: number) {
    const usersProjects = await this.projectRepository.find({
      where: { login: { id } },
      relations: ['login', 'tasks'],
    });
    return usersProjects;
  }

  async findOne(id: number) {
    const myProject = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });
    if (!myProject) {
      throw new Error('Project not found');
    }
    return myProject;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto, userId: number) {
    const myProject = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'login'],
    });
    if (!myProject) {
      throw new Error('Project not found');
    }
    console.log('a', myProject.login.id);
    console.log('a', userId);
    if (myProject.login.id !== userId) {
      throw new Error('You are not authorized to edit this project');
    }
    myProject.name = updateProjectDto.name;
    myProject.description = updateProjectDto.description;
    this.projectRepository.save(myProject);
    return myProject;
  }

  async remove(id: number, userId: number) {
    const myProject = await this.projectRepository.findOne({
      where: { id },
      relations: ['tasks', 'login'],
    });
    if (!myProject) {
      throw new Error('Project not found');
    }
    if (myProject.login.id !== userId) {
      throw new Error('You are not authorized to edit this project');
    }

    await this.projectRepository.remove(myProject);
  }
}
