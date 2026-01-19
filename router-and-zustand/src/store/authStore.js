// forma de hacer el logged con zustand y ese se usa en aquellos lugares donde te hace falta (en el header y en el btn)
import { create } from "zustand";

export const useAuthStore = create( ( set ) => ( {
  // estado
  isLoggedIn: false,

  // actions
  login: () => set( { isLoggedIn: true } ),
  logout: () => set( { isLoggedIn: false } )

} ) )