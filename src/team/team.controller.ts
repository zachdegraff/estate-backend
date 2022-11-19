import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto, IsEmailDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { LoginDto } from 'src/auth/dto/auth.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Public()
  @Post('owner')
  async createOwner(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.createTeam(createTeamDto, 'BUSINESS_OWNER');
  }

  @Public()
  @Post()
  async createUser(@Body() createTeamDto: CreateTeamDto) {
    return await this.teamService.createTeam(createTeamDto, 'USER');
  }

  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    return await this.teamService.login(data);
  }

  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @Get('email')
  async getByEmail(@Body() data: IsEmailDto) {
    return await this.teamService.findByEmail(data.email);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.teamService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
