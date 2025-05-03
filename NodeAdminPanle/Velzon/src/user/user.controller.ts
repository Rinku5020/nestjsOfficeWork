import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe, Put, Res, Render, UseInterceptors, UploadedFile, Query, UseGuards, Session,} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

@Get('/')
@UseGuards(AuthGuard) 
async userHome(@Query() query: any, @Res() res: Response, @Session() session: Record<string, any>) {
  const admin = session.admin;
  const { message } = query;
  const chartData = await this.userService.chartData();
  const mapData = await this.userService.adreessData();
  
  res.render('dashboard', {
    message,
    admin,
    chartData: JSON.stringify(chartData),
    mapData, 
  });



}

  @Get("form")
  @UseGuards(AuthGuard) 
  FormView(@Res() res: Response , @Session() session: Record<string, any>) {
    const admin = session.admin;
    res.render('form', { admin });
  }

  @Post('createForm')
  @UseGuards(AuthGuard) 
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: any,
    @Res() res: Response
  ) {
    const createUserDto = plainToInstance(CreateUserDto, {
      ...body,
      image: image?.filename || '',
    });

    const errors = await validate(createUserDto);
    const errorMessages: Record<string, string> = {};

    if (errors.length > 0) {
      errors.forEach((err) => {
        if (err.constraints) {
          errorMessages[err.property] = Object.values(err.constraints)[0];
        }
      });

      return res.status(400).render('form', {
        errors: errorMessages,
        old: body
      });
    }

    try {
      await this.userService.create(createUserDto);
      return res.redirect(`/user/getForm?message=User created successfully`);
    } catch (err) {
      const msg =
        err.message === 'Email already registered'
          ? err.message
          : 'Something went wrong. Email already registered.';
    
      return res.status(400).render('form', {
        error: msg,
        old: body
      });
    }
    
  }

  @Get('getForm')
  @UseGuards(AuthGuard) 
  async findAll(@Res() res: Response, @Query('message') message: string, @Session() session: Record<string, any>) {
    const admin = session.admin;
    const Data = await this.userService.findAll();
    res.render('dataTable', { Data, message, admin });
  }

  @Get('getForm/:id')
  @UseGuards(AuthGuard) 
 async findOne(@Param('id') id: string, @Res() res: Response, @Session() session: Record<string, any>) {
  const admin = session.admin; 
  const user = await this.userService.findOne(+id);
   const hobbies = user ? {
    playing: user.hobbies.includes('playing'),
    reading: user.hobbies.includes('reading'),
    travelling: user.hobbies.includes('travelling')
  } : { playing: false, reading: false, travelling: false };
   res.render('editForm', { user,hobbies ,admin});
  }

  @Post('update/:id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      }
    })
  }))
  async update(
    @Param('id') id: string,
    @Res() res: Response,
    @Body() body: any,
    @UploadedFile() image: Express.Multer.File
  ) {
    const dto = plainToInstance(UpdateUserDto, body);
    const errors = await validate(dto);
  
    if (errors.length > 0) {
      
      const formattedErrors: Record<string, string> = {};
      errors.forEach(err => {
        if (err.constraints) {
          formattedErrors[err.property] = Object.values(err.constraints).join(', ');
        }
      });
  
      
      return res.render('editForm', {
        user: { ...body, id },
        errors: formattedErrors
      });
    }
  
    const updateUserDto = {
      ...body,
      image: image?.filename || body.image
    };
  
    await this.userService.update(+id, updateUserDto);
    return res.redirect('/user/getForm?message=User updated successfully!');
  }
  
 @Get('delete/:id')
 @UseGuards(AuthGuard) 
async remove(@Param('id') id: string, @Res() res: Response) {
  await this.userService.remove(+id); 
  return res.redirect('/user/getForm?message=User deleted successfully!');
}



}