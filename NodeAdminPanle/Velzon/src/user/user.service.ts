import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
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
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        
        if (error.message.includes('Email')) {
          throw new Error('Email already registered');
        }
      }
      
      throw new Error('Database error');
    }
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
    user.image = updateUserDto.image || user.image; 
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new Error('Invalid ID: User not found');
    }
    return this.userRepository.delete(id);
  }



async chartData(): Promise<number[]> {
  const users = await this.userRepository.find({
    where: { dateOfBirth: Not(IsNull()) },
  });

  const monthCounts = Array(12).fill(0); 

  users.forEach(user => {
    const month = new Date(user.dateOfBirth).getMonth(); 
    monthCounts[month]++;
  });

  return monthCounts;
}



async adreessData(): Promise<Record<string, number>> {
  const users = await this.userRepository.find({
    where: { address: Not(IsNull()) },
  });

  const counts = {
    India: 0,
    Russia: 0,
    Greenland: 0,
  };

  users.forEach(user => {
    const address = user.address.toLowerCase();
    if (address.includes('india')) {
      counts.India++;
    } else if (address.includes('russia')) {
      counts.Russia++;
    } else if (address.includes('greenland')) {
      counts.Greenland++;
    }
  });

  return counts;
}

}
