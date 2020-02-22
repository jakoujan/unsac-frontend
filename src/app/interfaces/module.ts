import { ISubmodule } from './submodule';

export interface IModule {
    id: string;
    submodules: Array<ISubmodule>;
}
