export interface IFilter<T> {
    entity: T;
    startDate: Date;
    endDate: Date;
    page: number;
    rows: number;
    hidden: boolean;
}
