import { IModule } from './module';

export interface IUser {
    id: number;
    name: string;
    user: string;
    modules: Array<IModule>;
    email: string;
    password?: string;
    api_token?: string;
}
