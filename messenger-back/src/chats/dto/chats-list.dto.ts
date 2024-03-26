import { IsInt, IsOptional, Max, Min } from 'class-validator';

export default class ChatsListDto {
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
