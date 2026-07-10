import { PartialType } from "@nestjs/mapped-types";
import { CreateLoanDto } from "./create-loan.dto";
import { IsString, IsOptional } from "class-validator";

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @IsString()
  @IsOptional()
  status?: string;
}
