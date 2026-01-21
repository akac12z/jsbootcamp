import { create } from 'zustand'

export const useFavStore = create( ( set, get ) => ( {
  // Estado
  favorites: [],

  clearFavorites: () => {
    set( { favorites: [] } )
  },

  // Acciones
  addFav: ( jobId ) => {
    set( ( state ) => ( {
      favorites: state.favorites.includes( jobId )
        ? state.favorites
        : [ ...state.favorites, jobId ]
    } ) )
  },

  removeFav: ( jobId ) => {
    set( ( state ) => ( {
      favorites: state.favorites.filter( ( id ) => id !== jobId )
    } ) )
  },

  isFav: ( jobId ) => {
    return get().favorites.includes( jobId )
  },

  toggleFav: ( jobId ) => {
    const { addFav, removeFav, isFav } = get()
    const isFavorite = isFav( jobId )
    isFavorite ? removeFav( jobId ) : addFav( jobId )
  },

  countFav: () => get().favorites.length
} ) )