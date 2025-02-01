import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";


function Login() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth("actions");

    function handleSubmit(event) {
        event.preventDefault();
        if (!isLoading) {
            setIsLoading(true);
            fetch(``, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo iniciar sesión");
                    }
                    return response.json();
                })
                .then((responseData) => {
                    const { token } = responseData;
                    fetch(``, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error("Error al obtener el perfil del usuario");
                            }
                            return response.json();
                        })
                        .then((profileData) => {
                            console.log(`User ${profileData.email}`);
                            login(token, profileData.user__id);
                        });
                })        
                .catch((error) => {
                    console.error("Error error al iniciar sesión", error);
                    setIsError(true);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    return (
        <section >
            <div className="columns">
                <div className="column">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                            <label htmlFor="email">Email: </label>
                            <div className="control ">
                                <input
                                    className="input"
                                    type="text"
                                    id="email"
                                    name="email"
                                    ref={emailRef}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Contraseña:</label>
                            <div className="control has-icons-left">
                                <input
                                    className="input"
                                    type="password"
                                    id="password"
                                    name="password"
                                    ref={passwordRef}
                                />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                >
                                    Enviar
                                </button>
                                {isLoading && <p>Cargando...</p>}
                                {isError && <p>Error al cargar los datos.</p>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;