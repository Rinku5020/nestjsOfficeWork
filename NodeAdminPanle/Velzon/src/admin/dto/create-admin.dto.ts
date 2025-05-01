import { IsAlpha, IsEmail, IsNotEmpty } from "class-validator";

export class CreateAdminDto {
    
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
        password: string;
}
