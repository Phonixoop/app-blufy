import {
  ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString,
  MaxLength,
  MinLength
} from 'class-validator';
export class CreateOrderInput {
  @IsNotEmpty({ message: '!نام نباید خالی باشد' })
  @IsString({ message: '!نام باید رشته باشد' })
  @MinLength(3, { message: '!نام بیشتر از 255 مجاز نیست!' })
  @MaxLength(255, { message: '!نام بیشتر از 255 مجاز نیست!' })
  public name!: string;

  @IsNotEmpty({ message: '!ایمیل نباید خالی باشد' })
  @IsEmail({}, { message: '!ایمیل نادرست است!' })
  @MinLength(9, { message: '!ایمیل حداقل 9 کاراکتر است!' })
  @MaxLength(255, { message: '!ایمیل حداکثر 255 کاراکتر است!' })
  public email!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  public service?: string[];

  @IsOptional()
  @IsString({ message: '!قیمت باید رشته باشد' })
  public budget?: string;

  @IsOptional()
  @MaxLength(500, { message: 'توضیح بیش تر از 500 کاراکتر مجاز نیست!' })
  public mess?: string;

  @IsOptional()
  public attachments?: any;
}