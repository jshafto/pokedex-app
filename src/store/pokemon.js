export const LOAD = 'pokedex/pokemon/LOAD';
export const LOAD_DETAILS = 'pokedex/pokemon/LOAD_DETAILS';

export const load = (pokemon) => ({
  type: LOAD,
  pokemon
})

export const loadDetails = (pokemonDetails) => ({
  type: LOAD_DETAILS,
  pokemonDetails
})

export default function reducer (state = {}, action) {
  switch (action.type) {
    case LOAD: {
      return {...state, pokemon: action.pokemon};
    }
    case LOAD_DETAILS: {
      return {...state, pokemonDetails: action.pokemonDetails};
    }
    default: {
      return state;
    }
  }
}




export const getPokemon = () => async dispatch => {
  const res = await fetch('/api/pokemon');
  const data = await res.json();
  dispatch(load(data));
  return data;

}

export const getOnePokemon = (pokemonId) => async dispatch => {
  const res = await fetch(`/api/pokemon/${pokemonId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadDetails(data));
  }
}
