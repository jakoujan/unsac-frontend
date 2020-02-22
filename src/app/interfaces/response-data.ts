export interface IResposeData<T> {
    current_page: number;
    data: T;
    from: number;
    last_page: number;
    to: number;
    per_page: number;
    total: number;
}