import { IsString } from 'class-validator';

export default class RefreshDto {
  @IsString()
  oldRefresh: string;
}
