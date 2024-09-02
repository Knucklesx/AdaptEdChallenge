import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/login/auth/auth.guard';
import { LoginService } from 'src/login/login.service';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly loginService: LoginService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createProjectDto: CreateProjectDto, @Request() req) {
    const user = req.user;
    const myUser = await this.loginService.findByUsername(user.user);
    return this.projectsService.create(createProjectDto, myUser.id);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll(@Request() req) {
    const user = req.user;
    const myUser = await this.loginService.findByUsername(user.username);
    if (!myUser) {
      throw new Error('User not found');
    }
    return this.projectsService.findAll(myUser.id);
  }

  // @Get(':id')
  // @UseGuards(AuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.projectsService.findOne(+id);
  // }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Request() req,
  ) {
    const user = req.user;
    const myUser = await this.loginService.findByUsername(user.username);
    if (!myUser) {
      throw new Error('User not found');
    }
    return this.projectsService.update(+id, updateProjectDto, myUser.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string, @Request() req) {
    const user = req.user;
    const myUser = await this.loginService.findByUsername(user.username);
    if (!myUser) {
      throw new Error('User not found');
    }
    return this.projectsService.remove(+id, myUser.id);
  }

  @Get(':id/tasks')
  @UseGuards(AuthGuard)
  findOneTasks(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }
}
