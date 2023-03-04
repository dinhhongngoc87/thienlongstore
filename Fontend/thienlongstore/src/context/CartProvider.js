import React, { useState } from 'react';
const CartContext = React.createContext();

const CartProvider = ({ children }) => {
    const [cartItem, setCartItem] = useState([]);

    return <CartContext.Provider value={[cartItem, setCartItem]}>{children}</CartContext.Provider>;
};
export default CartProvider;
// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;
