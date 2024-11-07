import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiBadGatewayResponse, ApiBadRequestResponse, ApiHeader, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Query } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  login(@Body() authLogin: AuthLoginDto) {
    return this.authService.login(authLogin);
  }

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'perPage', required: false })
  findAll(
    @Query('name') name: string,
    @Query('page') page: number,
    @Query('perPage') perPage: number,

  ) {
    return this.authService.findAll(name, page, perPage);
  }
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiBadGatewayResponse({ description: 'Bad Gateway.' })
  @ApiBadRequestResponse({ description: 'Bad Request.' })
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

