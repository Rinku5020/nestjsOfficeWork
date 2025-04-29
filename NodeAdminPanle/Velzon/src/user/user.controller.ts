import { Controller, Get, Post, Body, Patch, Param, Delete,ValidationPipe, Put, Res, Render,} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


@Get("/")
  DashboardView(@Res() res: Response) {
  res.render('dashboard');
}

@Get("form")
  FormView(@Res() res: Response) {
  res.render('form');
}

@Post('createForm')
@Render('form')
async create(@Body() createUserDto: CreateUserDto) {
  console.log('Submitted data:', createUserDto);
  const { hobbies = [], gender = '', image = '' } = createUserDto;

  const hobbiesArray = Array.isArray(hobbies) ? hobbies : [hobbies];

  const checked = {
    playing: hobbiesArray.includes('playing') ? 'checked' : '',
    reading: hobbiesArray.includes('reading') ? 'checked' : '',
    travelling: hobbiesArray.includes('travelling') ? 'checked' : '',
  };

  const genderChecked = {
    maleChecked: gender === 'male' ? 'checked' : '',
    femaleChecked: gender === 'female' ? 'checked' : '',
  };

  const isMissing = [
    'FirstName',
    'LastName',
    'Email',
    'Phone',
    'gender',
    'hobbies',
    'dateOfBirth',
    'address',
    'image',
  ].some((field) => !createUserDto[field]);

  if (isMissing) {
    return {
      errorMessage: 'All fields are required',
      oldInput: createUserDto,
      checked,
      ...genderChecked,
      imagePath: image,
    };
  }

  await this.userService.create(createUserDto);

  return {
    successMessage: 'Form submitted successfully!',
    oldInput: {},
    checked: {},
    maleChecked: '',
    femaleChecked: '',
    imagePath: '',
  };
}





  @Get('getForm')
  async findAll(@Res() res: Response) {
    const Data = await this.userService.findAll();
    res.render('dataTable', { Data });
  }

  @Get('getForm/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('updateForm/:id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('/deleteForm/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
