import React from "react";

export const AppTitle = (props: React.PropsWithChildren<{}>) => {
    const { children } = props;
    return (
        <div className="container h-6rem my-4 lg:text-center">
            {children}
        </div>
    );
};
