import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export default class LoadChatDto {
  @IsString()
  chatId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  readonly skip?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  readonly take?: number;
}
