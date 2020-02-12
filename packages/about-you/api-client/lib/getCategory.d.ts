import { CategoryWith } from '@aboutyou/backbone/types/CategoryWith';
export default function (options: {
    ids: number[];
    path: string;
    with: CategoryWith;
    depth: number;
} | any): Promise<any>;
