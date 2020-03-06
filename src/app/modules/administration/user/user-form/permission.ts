import { Action } from './action';

export interface Permission {
    id: number;
    name: string;
    submodules: Array<Action>;
}
