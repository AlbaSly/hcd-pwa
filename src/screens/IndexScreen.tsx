import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/AuthService";
import { useEffect } from "react";

export const IndexScreen = () => {

    const authService = new AuthService();
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.getLocalSessionToken()) return navigate('/app');
    });
    
    const navigateToAuth = () => {
        navigate('/auth/login');
    }

    return (
        <div className="screen">
            <div className={"hero flex-col center-center"}>
                <div
                    className={
                        "hero__content fit-parent-size flex-col center-center p-4"
                    }
                >
                    <figure>
                        <img
                            src={"/logo/base/hcd_white_128px.png"}
                            className={
                                "drop-shadow animate__animated animate__fadeIn animate__fast"
                            }
                            alt={"Logo de Hazte Cuate del Dinero"}
                        />
                    </figure>

                    <div>
                        <h1
                            className={
                                "index animate__animated animate__fadeInLeft"
                            }
                            style={{ marginTop: "20px" }}
                        >
                            Gestiona tus{" "}
                            <strong style={{ fontWeight: 700 }}>gastos</strong>{" "}
                            e{" "}
                            <strong style={{ fontWeight: 700 }}>
                                ingresos
                            </strong>{" "}
                            de una forma sencilla.
                        </h1>

                        <h2
                            className={
                                "index animate__animated animate__delay-1s animate__fadeIn"
                            }
                            style={{ marginTop: "20px" }}
                        >
                            Cuando quieras, donde quieras.
                        </h2>
                    </div>
                </div>
            </div>

            <div className={"join-button-container flex-col center-center"}>
                <button
                    onClick={() => navigateToAuth()}
                    className={[
                        "button button-index button-default-size",
                        "animate__animated animate__fadeInUp animate__faster",
                    ].join(" ")}
                >
                    Comenzar
                </button>
            </div>
        </div>
    );
};
