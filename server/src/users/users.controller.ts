import {ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id){
        return this.userService.findOne({where: {id: id}});
    }
}
