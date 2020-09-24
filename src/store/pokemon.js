export const LOAD = 'pokedex/pokemon/LOAD';


export const load = (pokemon) => ({
  type: LOAD,
  pokemon
})

export default function reducer (state = [], action) {
  switch (action.type) {
    case LOAD: {
      console.log(action.pokemon)
      return action.pokemon;
    }
    default: {
      return state;
    }
  }
}




export const getPokemon = () => async dispatch => {
  const res = await fetch('/api/pokemon');
  const data = await res.json();
  console.log(data)
  dispatch(load(data));
  return data;

}
