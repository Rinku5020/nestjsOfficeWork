import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminController } from 'src/admin/admin.controller';
import { AdminService } from 'src/admin/admin.service';

@Module({
  controllers: [UserController,AdminController],
  providers: [UserService, AdminService],
  imports: [
    TypeOrmModule.forFeature([User,Admin]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestdb',
      entities: [User, Admin],
      synchronize: true,
      autoLoadEntities: true
    }),
    UserModule,
  ],
})
export class UserModule {}
