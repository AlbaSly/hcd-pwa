/**
 * Constante que contiene un arreglo de elementos INavbarItem para la gestión de barras de navegación.
 */
export const navbarItems: INavbarItem[] = [
    {
        icon: 'pi pi-credit-card',
        label: 'Movimientos',
        goTo: '/app/transactions',
    },
    {
        icon: 'pi pi-chart-line',
        label: 'Estadísticas',
        goTo: '/app/stats'
    },
    {
        icon: 'pi pi-home',
        label: 'Inicio',
        goTo: '/app'
    },
    {
        icon: 'pi pi-th-large',
        label: 'Categorías',
        goTo: '/app/categories'
    },
    {
        icon: 'pi pi-user',
        label: 'Mi Perfil',
        goTo: '/app/me',
    }
]

export const getSortedNavbarItems = (): INavbarItem[] => {
    const copy = [...navbarItems];

    const indexInicio = copy.findIndex(item => item.label === 'Inicio');

    // Mueve el elemento con label "Inicio" al principio del array
    if (indexInicio !== -1) {
        const inicioItem = copy.splice(indexInicio, 1)[0];
        copy.unshift(inicioItem);
    }

    return copy;
}

/**
 * Interfaz que representa la estructura de un elemento de la barra de navegación
 */
export interface INavbarItem {
    icon: string;
    label: string;
    goTo: string;
}