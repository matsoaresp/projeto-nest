import { Body, Controller,Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/singInt';

@Controller('auth')
export class AuthController {


constructor(private authService: AuthService){}

@HttpCode(HttpStatus.OK)
@Post('login')
signIn(@Body() signInDto: SignInDto){
    return this.authService.singIn(signInDto.email, signInDto.password);
}

}
