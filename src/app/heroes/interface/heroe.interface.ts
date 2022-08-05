export interface Heroe {
    id?:              string;
    superhero:        string;
    alter_ego:        string;
    first_appearance: string;
    alt_img?:         string;
    escuela?:string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}