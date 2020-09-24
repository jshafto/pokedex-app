export const LOAD = 'pokedex/pokemon/LOAD';
export const LOAD_DETAILS = 'pokedex/pokemon/LOAD_DETAILS';
export const LOAD_TYPES = '/pokedex/pokemon/LOAD_TYPES';
export const POST_POKEMON = 'pokedex/pokemon/POST_POKEMON';

export const load = (pokemon) => ({
  type: LOAD,
  pokemon
})

export const loadDetails = (pokemonDetails) => ({
  type: LOAD_DETAILS,
  pokemonDetails
})

export const loadTypes = (types) => ({
  type: LOAD_TYPES,
  types,
})

export const postPokemon = (data) => ({
  type: POST_POKEMON,
  newPokemon: data
})


export default function reducer (state = {types: []}, action) {
  switch (action.type) {
    case LOAD: {
      return {...state, pokemon: action.pokemon};
    }
    case LOAD_DETAILS: {
      return {...state, pokemonDetails: action.pokemonDetails};
    }
    case LOAD_TYPES: {
      return {...state, types: action.types};
    }
    case POST_POKEMON: {
      return {...state, pokemon: [...state.pokemon , action.newPokemon]};
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

export const getTypes = () => async dispatch => {
  const res = await fetch(`/api/pokemon/types`);
  if (res.ok) {
    const types = await res.json();
    dispatch(loadTypes(types))
  }
}

// async handleSubmit(e) {
//     e.preventDefault();

//     const payload = this.state;
//     console.log(payload)
//     payload.moves = [payload.move1, payload.move2];

//     const response = await fetch(`/api/pokemon`, {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     });
//     if (response.ok) {
//       this.props.handleCreated(await response.json());
//     }
//   }


export const createPokemon = (newPokemon) => async dispatch => {
  newPokemon.moves = [newPokemon.move1, newPokemon.move2];
  const res = await fetch(`/api/pokemon`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPokemon),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(postPokemon(data));
  }
}
