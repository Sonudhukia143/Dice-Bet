import { createContext, useContext, useReducer } from "react";

const LOGIN = "LOGIN";
const SIGNIN = "SIGNIN";
const LOGOUT = "LOGOUT";
const ROLLDICE = "ROLLDICE";
const initialState = {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: null,
}

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            localStorage.setItem('username', action.payload.user.username);
            localStorage.setItem('gmail', action.payload.user.gmail);
            localStorage.setItem('balance', action.payload.user.balance);
            localStorage.setItem('token', action.payload.token);
            return { ...state, isLoggedIn: true, token: action.payload.token };
        case LOGOUT:
            localStorage.clear();
            return { ...state, isLoggedIn: false, token: null };
        case SIGNIN:
            localStorage.setItem('username', action.payload.user.username);
            localStorage.setItem('gmail', action.payload.user.gmail);
            localStorage.setItem('balance', action.payload.user.balance);
            localStorage.setItem('token', action.payload.token);
            return { ...state, isLoggedIn: true, token: action.payload.token };
        case ROLLDICE:
            localStorage.setItem('balance', action.payload.newBalance);
            return { ...state, isLoggedIn: true };
        default:
            return state;
    }
};

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return (
        <AuthContext.Provider value={{ state, dispatch }} >
            {children}
        </ AuthContext.Provider>
    )
}