import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    // canActivate(
    //     context: ExecutionContext,
    // ): boolean | Promise<boolean> | Observable<boolean> {
    //     console.log(context);
    //     return true;
    // }


    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return matchRoles(roles, user.roles);
    }
}

function matchRoles(roles, userRoles): boolean {
    let match = false;

    userRoles.forEach(userRole => {
        if(roles.includes(userRole)) match = true
    });

    return match;
}
