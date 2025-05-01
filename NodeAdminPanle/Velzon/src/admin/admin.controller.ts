import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query, Req, Session } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';



@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Get('login')
  LoginView(
  @Query('message',) message: string,
  @Query('success') success: string,
  @Res() res: Response) {
    return res.render('login', { message, success });
  }

  @Post('logincheck')
  async login(@Body() body: { email: string; Password: string }, @Res() res: Response, @Req() req: any) {
    const { email, Password } = body;
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      return res.redirect('/admin/login?message=invalid email or password');
    }
    const hash = admin.password;
    const isMatch = await bcrypt.compare(Password, hash);
    if (!isMatch) {
      return res.redirect('/admin/login?message=invalid email or password');
    }
    req.session.admin = {
      id: admin.id,
      email: admin.email,
      
      
    };
   
    return res.redirect('/user/?message=login successfully');
  }




@Get('logout')
logout(@Res() res: Response, @Req() req: Request & { session: any }) {
  req.session.destroy((err: Error | null) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    return res.status(302).redirect('/admin/login');
  });
}

@Get('Emailverify')
getEmail(@Query('message') message: string, @Res() res: Response) {
  return res.render('email', { message });
}

@Post('verify')
async verify(@Body() body: { email: string },@Res({ passthrough: true }) res: Response,@Session() session: Record<string, any>,
) {
  const { email } = body;
  const admin = await this.adminService.findByEmail(email);
  
  if (!admin) {
    res.redirect('/admin/Emailverify?message= invalid email and must be required');
    return;
  }

  session.email = email;
  console.log('Email set in session:', session.email);

  res.redirect('/admin/reset?success=Email verified successfully');
}


@Get('reset')
reset(
  @Query('message') message: string,
  @Query('success') success: string,
  @Res() res: Response
) {
  return res.render('reset', { message, success });
}


@Post('resetpassword')
async resetPassword(
  @Body() body: { Password: string },
  @Res() res: Response,
  @Session() session: Record<string, any>,
) {
  const { Password: rawPassword } = body;
  const email = session.email;

  if (!email || !rawPassword) {
    return res.redirect('/admin/reset?message= required password');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(rawPassword, salt);

  const updateUserDto = { email, password: hash };

  await this.adminService.updatePassword(updateUserDto);

  
  session.email = null;

  return res.redirect('/admin/login?success=Password reset successfully');
}






}
