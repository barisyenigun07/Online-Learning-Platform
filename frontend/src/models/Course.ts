import { Section } from "./Section";
import { User } from "./User";

export interface Course {
    id: number,
    title: string,
    description: string,
    user: User,
    sections: Section[],
}