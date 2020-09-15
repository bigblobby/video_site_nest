import {Body, Controller, Get, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/CreateUserDto";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    getAll(){
        return this.userService.getAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        const {username, password} = createUserDto
        const user = this.userService.create(username, password);
        return user;
    }
}
