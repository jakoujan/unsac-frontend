import { ICourse } from './course';

export interface IInstructor {
    id: number;
    name: string;
    email: string;
    telephone: string;
    courses: Array<ICourse>;
}
