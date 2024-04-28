import { useEffect, useState } from "react";
import { Location } from "react-router-dom";

import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { Toolbar } from "primereact/toolbar";

import { getSortedNavbarItems, INavbarItem } from "../../../constants/navbarItems";
import SidebarMenuItem from "./SidebarMenuItem";

import './SidebarMenu.scss';

type SidebarMenuProps = {
    location: Location<any>;
}
export const SidebarMenu = (props: SidebarMenuProps) => {
    const { location } = props;

    const [ showing, setShowing ] = useState<boolean>(false);
    const [ items, setitems ] = useState<INavbarItem[]>([]);

    const [ currentNavbarItem, setCurrentNavbarItem ] = useState<INavbarItem>();

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
        <h2 className="font-bold text-gray-600">{currentNavbarItem?.label}</h2>
    )

    return (
        <>
            <div className="hidden lg:block w-full sticky top-0 z-5">
                <Toolbar start={menuButton} end={currentPageName} className="p-2 px-4"/>
            </div>
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