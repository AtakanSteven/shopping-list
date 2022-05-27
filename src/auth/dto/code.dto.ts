import { IsDefined } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CodeDto {
    @ApiProperty({
        description: "Phone number or email of the user.",
        examples: ["+905551122345"],
    })
    @IsDefined()
    name: string;

    @ApiProperty({
        description: "Code that user will receive to their e-mail depending on the username.",
        example: "123456",
    })
    @IsDefined()
    code: string;

    @ApiProperty({
        description: "Password of the user.",
        examples: ["Steven??97!"],
    })
    @IsDefined()
    password: string;
}
