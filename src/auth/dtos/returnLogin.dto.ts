import { ReturnUserDto } from "src/user/dto/returnUser.dto";

export interface ReturnLoginDto {
    user: ReturnUserDto
    accessToken: string
}