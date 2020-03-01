import { IModule } from './module';

export interface IUser {
    id: number;
    name: string;
    username: string;
    modules: Array<IModule>;
    email: string;
    password?: string;
    api_token?: string;
    grant_type?: string;
}
