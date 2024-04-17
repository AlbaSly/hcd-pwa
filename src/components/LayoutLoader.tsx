import { ProgressBar } from "primereact/progressbar"

export const LayoutLoader = () => {
    return (
        <div className="screen">
            <div className="fit-parent-size flex-col center-center animate__animated animate__fadeIn">
                <div>
                    <figure>
                        <img src="/logo/base/hcd_128px.png" alt="Logo de Hazte Cuate del Dinero" />
                    </figure>
                    <ProgressBar mode="indeterminate" style={{ height: '6px' }}></ProgressBar>
                </div>
            </div>
        </div>
    )
}