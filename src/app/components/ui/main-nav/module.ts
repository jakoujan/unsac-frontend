import { Submodule } from './submodule';

export interface Module {
    title: string;
    icon: string;
    id: number;
    submodules: Array<Submodule>;
    opened: boolean;
}
