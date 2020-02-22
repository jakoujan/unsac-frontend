import { Submodule } from './submodule';

export interface Module {
    title: string;
    icon: string;
    id: string;
    submodules: Array<Submodule>;
    opened: boolean;
}
