import { UserEntity } from "src/user/entities/user.entity"

export class LoginPayloadDto {
    id: number
    typeUser: number
    
    constructor(userEntity: UserEntity) {
        this.id = userEntity.id
        this.typeUser = userEntity.typeUser
    }
}