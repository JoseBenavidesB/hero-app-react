import { heroes } from "../data/hereos"


export const getHeroesByName = (name = '') => {
    if(name === '') {
        return []
    }
    name = name.toLowerCase();
    return heroes.filter( hero => hero.superhero.toLowerCase().includes(name));
}
