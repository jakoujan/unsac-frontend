import { Action } from './action';

export interface Permission {
    id:string;
    name: string;
    submodules: Array<Action>;
}
