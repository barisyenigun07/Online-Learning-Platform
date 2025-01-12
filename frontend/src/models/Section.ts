import { ContentType } from "./Content";
import { SectionCourse } from "./SectionCourse";

export interface Section {
    id: number,
    title: string,
    contents: ContentType[],
    course?: SectionCourse
}