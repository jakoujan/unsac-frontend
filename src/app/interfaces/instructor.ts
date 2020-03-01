import { ICourse } from './course';

export interface IInstructor {
    id: number;
    name: string;
    email: string;
    courses: Array<ICourse>;
}
