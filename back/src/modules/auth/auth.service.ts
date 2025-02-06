import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../application/services/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    console.log("AuthService chargé");
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.create(registerDto.email, hashedPassword, registerDto.role);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      companyId: user.company ? user.company.id : null,
      clientId: user.client ? user.client.id : null,
    };
  
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        company: user.company ? { id: user.company.id, name: user.company.name } : null,
        concession: user.concession ? { id: user.concession.id, name: user.concession.name } : null,
        client: user.client ? { id: user.client.id, name: user.client.name } : null,
      },
    };
  }  
}
