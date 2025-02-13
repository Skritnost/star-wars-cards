import { useQuery, keepPreviousData } from '@tanstack/react-query';
import axios from 'axios';
import { getIdFromUrl } from '@/utils/get-id-from-url.ts';

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

export function usePeople(page: number, search?: string) {
    return useQuery<PeopleResponse>({
        queryKey: ['people', { page, search }],
        queryFn: async ({ queryKey }) => {
            const [_key, { page }] = queryKey as [string, { page: number; search: string; }];
            const response = await axios.get<PeopleResponse>(
                `https://swapi.dev/api/people/?page=${page}&search=${search}`
            );
            const updatedPeople = response.data.results.map((person) => {
                const localKey = `person-${getIdFromUrl(person.url)}`;
                const localData = localStorage.getItem(localKey);
                if (localData) {
                    return JSON.parse(localData);
                }

                return person;
            });
            return { ...response.data, results: updatedPeople };
        },
        placeholderData: keepPreviousData,
    });
}
