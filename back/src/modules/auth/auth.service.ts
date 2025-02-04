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
    return this.userService.create({ ...registerDto, password: hashedPassword });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userService.findByEmail(email);
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    // Préparer le payload pour le JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      companyId: user.company?.id || null,    // Inclure l'ID de la company, si existant
      clientId: user.client?.id || null,     // Inclure l'ID du client, si existant
      concessionId: user.concession?.id || null, // Inclure l'ID de la concession, si existant
    };
  
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}