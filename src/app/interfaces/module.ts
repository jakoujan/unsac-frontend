import { ISubmodule } from './submodule';

export interface IModule {
    id: number;
    submodules: Array<ISubmodule>;
}
