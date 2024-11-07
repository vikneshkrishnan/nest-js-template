import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: createAuthDto.email },
    });
    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    // Hash the password

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

    const user = new Auth();
    user.name = createAuthDto.name;
    user.email = createAuthDto.email;
    user.password = hashedPassword;
    user.role = createAuthDto.role;
    user.phone = createAuthDto.phone;
    user.is_active = true;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    user.deletedAt = null;

    const accessToken = this.jwtService.sign({ email: user.email });
    user.accessToken = accessToken;

    const refreshToken = this.jwtService.sign({ email: user.email });
    user.refreshToken = refreshToken;

    await this.authRepository.save(user);
  }

  async login(authLogin: AuthLoginDto) {
    const user = await this.authRepository.findOne({
      where: { email: authLogin.email },
    });
    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const validPassword = await bcrypt.compare(
      authLogin.password,
      user.password,
    );
    if (!validPassword) {
      return {
        message: 'Invalid password',
      };
    }

    const accessToken = this.jwtService.sign({ email: user.email });
    user.accessToken = accessToken;

    const refreshToken = this.jwtService.sign({ email: user.email });
    user.refreshToken = refreshToken;

    await this.authRepository.save(user);
    return {
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }
  async findAll(name?: string, page = 1, perPage = 10) {
    const skip = (page - 1) * perPage;

    const query = this.authRepository.createQueryBuilder('mr_user');
    if (name) {
      query.andWhere('mr_user.name LIKE :name', { name: `%${name}%` });
    }
    query.skip(skip);
    query.take(perPage);
    return await query.getMany();
  }

  async findOne(id: number) {
    return await this.authRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    return await this.authRepository.update(id, updateAuthDto);
  }

  async remove(id: number) {
    return await this.authRepository.delete(id);
  }
}
