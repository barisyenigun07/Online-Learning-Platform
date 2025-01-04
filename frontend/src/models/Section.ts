import { ContentType } from "./Content";

export interface Section {
    id: number,
    title: string,
    contents: ContentType[]
}