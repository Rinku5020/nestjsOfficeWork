import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';



@Injectable()
export class AdminService {
constructor(
  @InjectRepository(Admin)
  private readonly adminRepository: Repository<Admin>,
) { }
async findByEmail(email: string): Promise<Admin | null> {
  const admin = await this.adminRepository.findOne({ where: { email } });
  return admin || null;
}

async updatePassword(updateUserDto: { email: string; password: string }) {
  const result = await this.adminRepository.findOneBy({ email: updateUserDto.email });

  if (result) {
    result.password = updateUserDto.password;
    return this.adminRepository.save(result);
  }

  throw new Error('Admin not found');
}



}
