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