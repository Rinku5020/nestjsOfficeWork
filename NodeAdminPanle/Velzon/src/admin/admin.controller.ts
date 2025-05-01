import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Render, Query, Req } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }


  @Get('login')
  LoginView(@Query('message') message: string, @Res() res: Response) {
    return res.render('login', { message });
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
async verify(@Body() body: { email: string }, @Res() res: Response) {
  const { email } = body;
  const admin = await this.adminService.findByEmail(email);
  if (!admin ) {
    return res.redirect('/admin/Emailverify?message= invalid email and must be required');
  }
  return res.redirect('/admin/reset?message=Email verified successfully');
}

@Get('reset')
reset(@Query('message') message: string, @Res() res: Response) {
  return res.render('reset', { message });
}

}
