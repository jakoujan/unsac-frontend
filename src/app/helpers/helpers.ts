import { IModule } from '../interfaces/module';
import { Module } from '../components/ui/main-nav/module';
import { Permission } from '../modules/administration/user/user-form/permission';
import { Action } from '../modules/administration/user/user-form/action';

export function validateProfile(data: any, modules: Array<IModule>): boolean {
    if (data.validate) {
        return modules.some(p => {
            if (data.module === p.id) {
                return p.submodules.some(sm => sm.id === data.id);
            }
            return false;
        });
    }
    return true;
}

export function buildFormPermissions(modules: Array<Module>, permissions: Array<IModule>): Array<Permission> {
    const options: Array<Permission> = [];
    modules.forEach(module => {
        let option: Permission = {
            id: module.id,
            name: module.title,
            submodules: []
        }
        let pm;
        if (permissions) {
            pm = permissions.find(p => p.id === module.id);
        }

        module.submodules.forEach(submodule => {
            let psm;
            if (pm) {
                psm = pm.submodules.find(pms => pms.id === submodule.id);
            }
            let sm: Action = {
                id: submodule.id,
                name: submodule.name,
                access: psm !== undefined,
                write: psm ? psm.write : false

            }
            option.submodules.push(sm);
        })
        options.push(option);
    });
    return options;
}

export function buildUserPermissions(permissions: Array<Permission>): Array<IModule> {
    let modules: Array<IModule> = [];
    permissions.forEach(permission => {
        const sms = permission.submodules.filter(sm => sm.access);
        if (sms.length) {
            const module: IModule = {
                id: permission.id,
                submodules: []
            }
            sms.forEach(sm => {
                module.submodules.push({
                    id: sm.id,
                    write: sm.write
                });
            });
            modules.push(module);
        }
    });
    return modules;
}