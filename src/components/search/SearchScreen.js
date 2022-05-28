import React, { useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../Hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import queryString from 'query-string'

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q='' } = queryString.parse(location.search);

  const [ values , handleInputChange ] = useForm({
    searchText: q
  });

  const { searchText } = values;

  const heroesFiltered = useMemo(( )=> getHeroesByName(q), [q]);
  
  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`?q=${ searchText }`)

  };

  return (
    <>
        <h1>Search</h1>
        <hr/>
        <div className="row">
          <div className="col-5">
            <h4>Search</h4><hr/>

            <form onSubmit={handleSearch}> {/*is the same: (e) => handleSearch(e) */}
              <input
                type="text"
                placeholder='Find a hero'
                name='searchText'
                autoComplete='off'
                className='m-2'
                value={searchText}
                
                onChange={handleInputChange}
              />

              <button type='submit' className='btn btn-outline-primary'>
                Go!
              </button>
            </form>
          </div>
          <div className="col-7">
            <h4>Results</h4>
            <hr/>
            {
              (q === '')
                ? <div className="alert alert-info">Find a Hero</div>
                : ( heroesFiltered.length === 0 )
                  && <div className="alert alert-danger">There is not result: {q}</div>
            }

            {
              heroesFiltered.map( hero => (
                <HeroCard 
                key={hero.id}
                {...hero}/>
              ))
            }
          </div>
        </div>
    </>
  )
}
