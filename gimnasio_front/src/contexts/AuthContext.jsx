import { createContext, useReducer, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext({
    state: {},
    actions: {},
});

const ACTIONS = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    SET_ROLE: "SET_ROLE",
    SET_USER_ID: "SET_USER_ID",
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOGIN:
            return {
                ...state,
                token: action.payload.token,
                role: action.payload.role,
                isAuthenticated: true,
            };
        case ACTIONS.LOGOUT:
            return {
                isAuthenticated: false,
                token: null,
                role: null,
            };
        case ACTIONS.SET_ROLE:
            return {
                    ...state,
                    role: action.payload.role,
            };
        case ACTIONS.SET_USER_ID:
            return {
                ...state,
                userId: action.payload.userId,
            };
        default:
            return state;
    }
}

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, {
        token: localStorage.getItem("authToken"),
        role: localStorage.getItem("userRole"),
        isAuthenticated: localStorage.getItem("authToken") ? true : false,
         });


    const navigate = useNavigate();
    const location = useLocation();

    const actions = {
        login: (token,role) => {
            dispatch({ 
                type: ACTIONS.LOGIN, 
                payload:{ token,role },
            });
            localStorage.setItem("authToken", token);
            const origin = location.state?.from?.pathname || "/";
            navigate(origin);
        },
        logout: async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/logout", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${state.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                } else {
                    console.error("Error al cerrar sesión en el servidor");
                }
            } catch (error) {
                console.error("Error de red al cerrar sesión:", error);
            }
            dispatch({ type: ACTIONS.LOGOUT });
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
            navigate("/login");
        },
        setRole: (role) => {
            dispatch({
                type: ACTIONS.SET_ROLE,
                payload: { role },
            });
            localStorage.setItem("userRole", role);
        },
        setUserId: (userId) => {
            dispatch({
                type: ACTIONS.SET_USER_ID,
                payload: { userId },
            });
        },
    };

    return (
        <AuthContext.Provider value={{ state, actions }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(type) {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}

export { AuthContext, AuthProvider, useAuth };
