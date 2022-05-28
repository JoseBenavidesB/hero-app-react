import { heroes } from "../data/hereos"

export const getHeroById = (id) => {

    return heroes.find( (hero)=> hero.id === id )
}