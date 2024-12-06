import MovieDBApiClient from "../src/MovieDBApiClient";

const dbApiClient = new MovieDBApiClient("")

test('it filters editors by the editor key in the response', () => {
    const movieCredits = [
        {
            id: 1234,
            cast:[
                {
                    name: "Brooks DuBois",
                    known_for_department: "Editing"
                },
                {
                    name: "Elvis Foster",
                    known_for_department: "Filmer"
                },
                {
                    name: "George Clooney",
                    known_for_department: "Editing"
                }
            ]
        },
        {
            id: 3445,
            cast:[
                {
                    name: "Brooks DuBois",
                    known_for_department: "Filming"
                },
                {
                    name: "Elvis Foster",
                    known_for_department: "Filmer"
                },
                {
                    name: "George Clooney",
                    known_for_department: "Editing"
                }
            ]
        }
    ]

    // @ts-ignore
    const result = dbApiClient.filterByEditors(movieCredits)
    const expected = [
        {
            id: 1234,
            editors: ["Brooks DuBois", "George Clooney"]
        },
        {
            id: 3445,
            editors: ["George Clooney"]
        }
    ]
    expect(result).toEqual(expected)
});

test('it looks up editors by id and merges them into a movie', () => {
    const movieResults = [
        {
            id: 1234,
            title: "Some Movie",
            release_date: "December 1st 2020",
            vote_average: 45.3,
        },
        {
            id: 3445,
            title: "Some Other Movie",
            release_date: "January 30th 2020",
            vote_average: 48.3,
        }
    ]
    const editorsById =  [
        {
            id: 1234,
            editors: ["Brooks DuBois", "George Clooney"]
        },
        {
            id: 3445,
            editors: ["George Clooney"]
        }
    ]

    // @ts-ignore
    const result = dbApiClient.mapMovieResponsesToEditors(movieResults, editorsById)
    const expected = [
        {
            title: "Some Movie",
            release_date: "December 1st 2020",
            vote_average: 45.3,
            editors: ["Brooks DuBois", "George Clooney"]
        },
        {
            title: "Some Other Movie",
            release_date: "January 30th 2020",
            vote_average: 48.3,
            editors: ["George Clooney"]
        }
    ]

    expect(result).toEqual(expected)
});