import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

export interface Person {
    name: string;
    avatar?: string;
    url: string;
}

export interface PeopleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Person[];
}

export function usePeople(page: number) {
    return useQuery<PeopleResponse>({
        queryKey: ['people', { page }],
        queryFn: async ({ queryKey }): Promise<PeopleResponse> => {
            const [_key, { page }] = queryKey as [string, { page: number; }];
            const response = await axios.get(
                `https://swapi.dev/api/people/?page=${page}`
            );
            return response.data;
        },
        placeholderData: keepPreviousData,
    });
}
