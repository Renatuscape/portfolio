import { RepoData } from "../../types/Types";

export function IsWhiteListed(repo: RepoData) {
    const whiteList = [
        'portfolio',
        'portfolio-api',
        'PitchMatchFrontEnd',
        'javascript-exercises-TDD',
        'AStrangerComesHome',
        'Udemy-Shop-Front',
        'Udemy-Tic-Tac-Toe',
        'MovieBackendPresentation',
        'AcademicWork-EFSamurai',
        'Salary-Total',
        'AcademicWork-EFSamurai',
    ]

    return whiteList.includes(repo.name);
}

export function NameFormatter(name: string) {
    name = name
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // Adds space between lowercase and uppercase
        .replace(/-/g, ' ')                       // Replaces hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase()); // Capitalizes first letter of each word

    if (name.includes('Api ')) {
        name = name.replace('Api ', 'API ');
    }
    else if (name.includes(' Api')) {
        name = name.replace(' Api', ' API');
    }

    if (name.includes('Js ')) {
        name = name.replace('Js ', 'JS ');
    }
    else if (name.includes(' Js')) {
        name = name.replace(' Js', ' JS');
    }

    if (name.includes('Ts ')) {
        name = name.replace('Ts ', 'TS ');
    }
    else if (name.includes(' Ts')) {
        name = name.replace(' Ts', ' TS');
    }

    // Fix specific titles below here. Alternately, make a separate function that pulls alternate names from a list
    if (name.includes('AStranger')) {
        name = name.replace('AStranger', 'A Stranger');
    }

    if (name.includes('Tic Tac Toe')) {
        name = name.replace('Tic Tac Toe', 'Tic-Tac-Toe');
    }

    if (name.includes('Pitch Match')) {
        name = name.replace('Pitch Match', 'PitchMatch');
    }

    return name;
}