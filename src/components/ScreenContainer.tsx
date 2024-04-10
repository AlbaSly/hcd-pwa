import React from "react";

export const ScreenContainer = (props: React.PropsWithChildren<{}>) => {
    const {
        children
    } = props;

    return (
        <div className={'screen-container'}>
            {children}
        </div>
    )
}