import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "./HomePage";
import { PeopleResponse, usePeople } from "@/hooks/use-people";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from '@tanstack/react-query';

jest.mock("@/hooks/use-people");
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

describe("<HomePage />", () => {
    const mockUsePeople = usePeople as jest.MockedFunction<typeof usePeople>;
    const mockNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows loading overlay when isLoading is true", () => {
        mockUsePeople.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
            isFetching: false,
        } as UseQueryResult<PeopleResponse>);

        render(<HomePage />);
        expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    });

    it("shows error message if isError is true", () => {
        mockUsePeople.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            isFetching: false,
        } as UseQueryResult<PeopleResponse>);

        render(<HomePage />);
        expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
    });

    it("shows 'No characters found' if data is undefined", () => {
        mockUsePeople.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: false,
            isFetching: false,
        } as UseQueryResult<PeopleResponse>);

        render(<HomePage />);
        expect(
            screen.getByText(/No characters found/i)
        ).toBeInTheDocument();
    });

    it("renders characters and allows navigation", () => {
        mockUsePeople.mockReturnValue({
            data: {
                count: 2,
                next: null,
                results: [
                    {
                        name: "Luke Skywalker",
                        avatar: "",
                        url: "https://swapi.dev/api/people/1/",
                    },
                    {
                        name: "Darth Vader",
                        avatar: "",
                        url: "https://swapi.dev/api/people/4/",
                    },
                ],
            },
            isLoading: false,
            isError: false,
            isFetching: false,
        } as UseQueryResult<PeopleResponse>);

        const navigateMock = jest.fn();
        mockNavigate.mockReturnValue(navigateMock);

        render(<HomePage />);

        expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
        expect(screen.getByText(/Darth Vader/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText("Luke Skywalker"));
        expect(navigateMock).toHaveBeenCalledWith("/1");
    });

    it("shows a loading overlay when isFetching is true (but not isLoading)", () => {
        mockUsePeople.mockReturnValue({
            data: {
                count: 1,
                next: null,
                results: [
                    {
                        name: "Luke Skywalker",
                        avatar: "",
                        url: "https://swapi.dev/api/people/1/",
                    },
                ],
            },
            isLoading: false,
            isError: false,
            isFetching: true,
        } as UseQueryResult<PeopleResponse>);

        render(<HomePage />);

        expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
        expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    });
});
