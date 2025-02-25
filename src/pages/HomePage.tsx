import React, { useState } from 'react';
import { usePeople } from '@/hooks/use-people';
import { useNavigate } from "react-router-dom"
import PersonCard from '@/components/PersonCard';
import {
    Pagination,
    PaginationContent,
    PaginationPrevious,
    PaginationNext,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import LoadingOverlay from '@/components/LoadingOverlay.tsx';
import { getIdFromUrl } from '@/utils/get-id-from-url.ts';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');

    const {data, isLoading, isError, isFetching} = usePeople(page, search);

    if (isLoading) return <LoadingOverlay/>;
    if (isError) return <div className="text-center p-4">Error fetching data</div>;
    if (!data) {
        return (
            <div className="py-16 text-center">
                <p className="text-xl font-medium text-muted-foreground">
                    No characters found.
                </p>
            </div>
        );
    }

    const totalPages = Math.ceil(data.count / 10);
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);

    return (
        <>
            {isFetching ? <LoadingOverlay/> : null}

            <div className="min-h-screen p-4">
                <div className="container mx-auto">
                    <div className="mb-6 flex justify-center">
                        <input
                            type="text"
                            placeholder="Search characters..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="border border-gray-300 rounded p-2 w-full max-w-sm"
                        />
                    </div>

                    {data.results.length ? (
                            <>
                                <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {data.results.map(({name, avatar, url}) => (
                                        <PersonCard
                                            key={name}
                                            name={name}
                                            avatar={avatar}
                                            onClick={() => navigate(`/${getIdFromUrl(url)}`)}
                                        />
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <Pagination>
                                        <PaginationContent className="flex flex-wrap">
                                            <PaginationPrevious
                                                className="cursor-pointer"
                                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                            />
                                            {pages.map((pageNumber) => (
                                                <PaginationItem key={pageNumber}>
                                                    <PaginationLink
                                                        className="cursor-pointer"
                                                        isActive={pageNumber === page}
                                                        onClick={() => setPage(pageNumber)}
                                                    >
                                                        {pageNumber}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            ))}
                                            <PaginationNext
                                                className="cursor-pointer"
                                                onClick={() => setPage((old) => (data.next ? old + 1 : old))}
                                            />
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </>

                        ) :
                        (
                            <div className="py-16 text-center">
                                <p className="text-xl font-medium text-muted-foreground">
                                    No characters found.
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
        ;
};

export default HomePage;
