import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';

export interface Character {
    name: string;
    url: string;
}

export interface PeopleResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

export function usePeople(page: number, search: string) {
    return useQuery<PeopleResponse>({
        queryKey: ['people', { page, search }],
        queryFn: async ({ queryKey }): Promise<PeopleResponse> => {
            const [_key, { page, search }] = queryKey as [string, { page: number; search: string }];
            const response = await axios.get(
                `https://swapi.dev/api/people/?page=${page}&search=${search}`
            );
            return response.data;
        },
        placeholderData: keepPreviousData,
    });
}
