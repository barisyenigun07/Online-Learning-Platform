export interface Content {
    id: number,
    title: string,
    type: 'video' | 'quiz' | 'assignment'
}

export interface Video extends Content {
    type: 'video',
    url: string
}

export interface Quiz extends Content {
    type: 'quiz',
    questions: Question[]
}

export interface Assignment extends Content {
    type: 'assignment',
    description: string
}

export type ContentType = Video | Quiz | Assignment

interface Question {
    id: number,
    text: string,
    options: string[],
    correctOption: string
}