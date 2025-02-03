import { IsUUID, IsInt, Min } from "class-validator";

export class CreatePartStockDto {
  @IsUUID()
  partId: string;

  @IsInt()
  @Min(0)
  quantity: number;

  @IsInt()
  @Min(0)
  alertThreshold: number;
}