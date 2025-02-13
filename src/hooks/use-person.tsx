import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

export interface PersonData {
    name: string;
    birthYear: string;
    eyeColor: string;
    gender: string;
    hairColor: string;
    height: string;
    mass: string;
    skinColor: string;
    created: string;
    edited: string;
    url: string;
    avatar?: string;
}

interface PersonDataBE {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    created: string;
    edited: string;
    url: string;
    avatar?: string;
}

export function usePerson(id: string) {
    return useQuery<Record<string, string> & PersonData>({
        queryKey: ["person", { id }],
        queryFn: async ({ queryKey }) => {
            const [, params] = queryKey;
            const { id } = params as { id: string };
            const localKey = `person-${id}`;
            const localData = localStorage.getItem(localKey);
            if (localData) {
                return JSON.parse(localData);
            } else {
                const response = await axios.get<PersonDataBE>(`https://swapi.dev/api/people/${id}/`);
                const apiData = response.data;
                const parsedData: PersonData = {
                    name: apiData.name,
                    birthYear: apiData.birth_year,
                    eyeColor: apiData.eye_color,
                    gender: apiData.gender,
                    hairColor: apiData.hair_color,
                    height: apiData.height,
                    mass: apiData.mass,
                    skinColor: apiData.skin_color,
                    created: apiData.created,
                    edited: apiData.edited,
                    avatar: apiData.avatar || "",
                    url: apiData.url,
                };

                return parsedData;
            }
        },
    });
}
