import React, { useEffect, useState } from "react";
import { INavbarItem } from "../../../constants/navbarItems";
import { Location, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

type SidebarMenuItemProps = {
    item: INavbarItem;
    location: Location<any>;
    handleSelect: (item : INavbarItem) => void;
};
const SidebarMenuItem = (props: SidebarMenuItemProps) => {
    const { item, location, handleSelect } = props;

    const navigate = useNavigate();
    const [isSamePath, setIsSamePath] = useState(false);

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
    };

    return (
        <Button
            onClick={() => {goTo(); handleSelect(item)}}
            icon={item.icon}
            raised={isSamePath}
            text={!isSamePath}
            className="flex gap-2 font-medium bg-no shadow-2"
        >
            {item.label}
        </Button>
    );
};

export default SidebarMenuItem;
