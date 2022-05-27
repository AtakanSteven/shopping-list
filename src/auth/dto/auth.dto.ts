import { ApiProperty } from "@nestjs/swagger";
import { IsDefined } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: "Email of the user.",
        examples: ["+atakan.beddall@sigmatelecom.com", "test@mail.com"],
    })
    @IsDefined()
    name: string;

    @ApiProperty({
        description: "Password of the user.",
        examples: ["Steven??97!"],
    })
    @IsDefined()
    password: string;
}
