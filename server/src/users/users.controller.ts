import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUserDto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        const {email, password} = createUserDto
        const user = this.userService.create(email, password);
        return user;
    }
}
