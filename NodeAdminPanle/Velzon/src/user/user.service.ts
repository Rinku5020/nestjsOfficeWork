import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    let user : User = new User();
    user.FirstName = createUserDto.FirstName;
    user.LastName = createUserDto.LastName;
    user.Email = createUserDto.Email;
    user.Phone = createUserDto.Phone;
    user.gender = createUserDto.gender;
    user.hobbies = createUserDto.hobbies;
    user.dateOfBirth = createUserDto.dateOfBirth;
    user.address = createUserDto.address;
    user.image = createUserDto.image;
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Invalid ID: User not found');
    }
    return this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Invalid ID: User not found');
    }
    user.FirstName = updateUserDto.FirstName;
    user.LastName = updateUserDto.LastName;
    user.Email = updateUserDto.Email;
    user.Phone = updateUserDto.Phone;
    user.gender = updateUserDto.gender;
    user.hobbies = updateUserDto.hobbies;
    user.dateOfBirth = updateUserDto.dateOfBirth;
    user.address = updateUserDto.address;
    user.image = updateUserDto.image;
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Invalid ID: User not found');
    }
    return this.userRepository.delete(id);
  }
}
