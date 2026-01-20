import { create } from "zustand";

export const useFavStore = create( ( set, get ) => ( {
  // el get permite leer el estado dentro del estado. y así poder ver los fav en este caso
  // estado
  fav: [],


  // actions
  // estado: lista de fav
  addFav: ( jobId ) => {
    set( ( state ) => {
      fav: state.fav.includes( jobId )
        ? state.fav
        : [ ...state.fav, jobId ]
    } )

  },

  removeFav: ( jobId ) => {
    set( ( state ) => ( {
      fav: state.fav.filter( ( id ) => id !== jobId ) // filtra los que sean distintos del job id, lo otros los eleminia, es decir, si eres distinto al fav que queires quitar, te quedas
    } ) )
  },

  isFav: ( jobId ) => {
    // esto es el get. no tienes que hacer nada, solo leer los que hay y mostrarlos
    // este te ayudará a ver si el btn está o no con fav
    return get().fav.includes( jobId )
  },


  // creas el toggle para poder manejar de manera unísona tanto el show, el remove como el add
  toggleFav: ( jobId ) => {
    const { fav, addFav, removeFav, isFav } = get();
    const isFavorite = isFav( jobId )

    isFavorite ? removeFav : addFav;
  },

  countFav: () => get().fav.length,

} ) )
