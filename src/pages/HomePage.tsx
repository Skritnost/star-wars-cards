import React, { useState } from 'react';
import { usePeople } from '../hooks/use-people';
import { Button } from '@/components/ui/button.tsx';

const HomePage: React.FC = () => {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const { data, isLoading, isError } = usePeople(page, search);

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-center p-4">Error fetching data</div>;

    return (
        <div className="min-h-screen">
            <div className="container mx-auto p-4">
                {/* Search Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search characters..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className="w-full p-3 rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                {/* Characters List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data?.results.map((character) => (
                        <div key={character.url} className="bg-card bg-opacity-75 p-4 rounded shadow">
                            <h2 className="text-xl font-bold text-card-foreground mb-2">
                                {character.name}
                            </h2>
                            {/* Additional character info can go here */}
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-between mt-8">
                    <Button
                        onClick={() => setPage((old) => Math.max(old - 1, 1))}
                        disabled={!data?.previous}
                        className="px-4 py-2 bg-primary hover:bg-primary-foreground text-primary-foreground rounded disabled:opacity-50"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setPage((old) => (data?.next ? old + 1 : old))}
                        disabled={!data?.next}
                        className="px-4 py-2 bg-primary hover:bg-primary-foreground text-primary-foreground rounded disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
