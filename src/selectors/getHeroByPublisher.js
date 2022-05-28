import { heroes } from "../data/hereos"



export const getHeroesByPublisher = ( publisher ) => {

    const validPublishers = ['DC Comics', 'Marvel Comics']

    if( !validPublishers.includes(publisher) ) {
        throw new Error( `${ publisher } is not a valid publisher` );
    }
    return heroes.filter( (hero) => {
       return hero.publisher === publisher
    })
}

//return heroes.filter( (hero) => hero.publisher === publisher)