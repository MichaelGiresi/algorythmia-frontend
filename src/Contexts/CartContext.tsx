import { createContext } from "react";



type CartContextTypes = {
    hamburger: boolean,
    setHamburger: React.Dispatch<React.SetStateAction<boolean>>,
    about: boolean, setAbout: React.Dispatch<React.SetStateAction<boolean>>,
    cartCount:number, setCartCount: React.Dispatch<React.SetStateAction<number>>,
    cart:boolean, setCart:React.Dispatch<React.SetStateAction<boolean>>,
    localCartItems: any[], setLocalCartItems: React.Dispatch<React.SetStateAction<any[]>>
}


export const CartContext = createContext<null | CartContextTypes>(null);