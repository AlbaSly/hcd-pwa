import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toolbar } from "primereact/toolbar";

import { getSortedNavbarItems, INavbarItem, navbarItems } from "../../../constants/navbarItems";
import './SidebarMenu.scss';
import SidebarMenuItem from "./SidebarMenuItem";
import { Location } from "react-router-dom";

type SidebarMenuProps = {
    location: Location<any>;
}
export const SidebarMenu = (props: SidebarMenuProps) => {
    const { location } = props;

    const [showing, setShowing] = useState<boolean>(false);
    const [items, setitems] = useState<INavbarItem[]>([]);

    const [currentNavbarItem, setCurrentNavbarItem] = useState<INavbarItem>();

    useEffect(() => {
        const loadItems = () => {
            const _items = getSortedNavbarItems();

            setitems(_items);
            
            const found = _items.find(item => item.goTo == location.pathname);
            if (found) setCurrentNavbarItem(found);
        };

        loadItems();
    }, []);

    const show = () => setShowing(true);
    const hide = () => setShowing(false);

    const selectItem = (item: INavbarItem) => {
        setCurrentNavbarItem(item);
        hide();
    };

    const menuButton = (): JSX.Element => (
        <>
            <Button
                onClick={show}
                icon={<i className="pi pi-bars" style={{ fontSize: "1.25rem" }}></i>}
                className="shadow-2"
            />
        </>
    );

    const currentPageName = (): JSX.Element => (
        <h2 className="font-bold">{currentNavbarItem?.label}</h2>
    )

    return (
        <>
            <Toolbar start={menuButton} end={currentPageName} className="p-2 px-4 sticky top-0"/>
            <Sidebar onHide={hide} visible={showing} header={<h2 className="font-bold block w-full text-center">Menú</h2>}>
                <div className="h-full flex flex-col gap-2 ">
                {
                    items.map((item, index) => <SidebarMenuItem key={index} item={item} location={location} handleSelect={selectItem}/>)
                }
                </div>
            </Sidebar>
        </>
    );
};