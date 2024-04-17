import { useEffect, useState } from "react";
import { Location, useNavigate } from "react-router-dom";

import { Button } from "primereact/button";

import { INavbarItem } from "../../../constants/navbarItems";
import "./BottomNavbarItem.scss";

type BottomNavbarItemProps = {
    item: INavbarItem;
    location: Location<any>;
};
const BottomNavbarItem = (props: BottomNavbarItemProps) => {
    const { item, location } = props;

    const navigate = useNavigate();

    const [ isSamePath, setIsSamePath ] = useState(false);

    useEffect(() => {
        const determineStyles = () => {
            if (location.pathname == item.goTo) {
                setIsSamePath(true);
            } else {
                setIsSamePath(false);
            }
        };

        determineStyles();
    }, [location]);

    const goTo = () => {
        navigate(item.goTo);
    }

    return (
        <Button
            onClick={() => goTo()}
            icon={item.icon}
            rounded={isSamePath}
            raised={isSamePath}
            text={!isSamePath}
            className={[
                "p-4 bottom-navbar__item",
                isSamePath ? "bottom-navbar__item--selected" : "",
            ].join(" ")}
        />
    );
};

export default BottomNavbarItem;
