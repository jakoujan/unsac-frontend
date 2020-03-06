import { IModule } from './module';

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    modules: Array<IModule>;
    api_token?: string;
    grant_type?: string;
}
