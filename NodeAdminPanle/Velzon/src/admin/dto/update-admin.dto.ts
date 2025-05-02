import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';
import { IsAlpha, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {

            @IsAlpha()
            @IsNotEmpty()
            FirstName: string;
        
            @IsAlpha()
            @IsNotEmpty()
            LastName: string;
    
            @IsEmail()
            @IsNotEmpty()
            email: string;
            
            @IsNotEmpty()
            @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: 'Password must be at least 8 characters long, contain at least one letter and one number' })
            password: string;

            @IsNotEmpty()
            confirmPassword: string;


}
