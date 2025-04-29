import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsAlpha,IsEmail, IsString, IsNumberString, IsDateString, IsArray, IsNotEmpty, Matches  } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsAlpha()
        @IsNotEmpty()
        FirstName: string;
    
        @IsAlpha()
        @IsNotEmpty()
        LastName: string;
    
        @IsEmail()
        @IsNotEmpty()
        Email: string;
    
        @IsNumberString()
        @Matches(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
        @IsNotEmpty()
        @Transform(({ value }) => value.toString())
        Phone: string;
    
        @IsString()
        @IsNotEmpty()
        gender: string;
    
        @IsString({ each: true })
        @IsArray()
        @IsNotEmpty()
        @Transform(({ value }) =>
            typeof value === 'string' ? value.split(',') : value
        )
        hobbies: string[];
    
        @IsDateString()
        @IsNotEmpty()
        dateOfBirth: Date;
    
        @IsString()
        @IsNotEmpty()
        address: string;
    
        @IsString()
        @IsNotEmpty()
        image: string;
}
