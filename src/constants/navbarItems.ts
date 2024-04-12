export const navbarItems: INavbarItem[] = [
    {
        icon: 'pi pi-home',
        label: 'Inicio',
        goTo: '/app'
    },
    {
        icon: 'pi pi-credit-card',
        label: 'Transacciones',
        goTo: '/app/transactions',
    },
    {
        icon: 'pi pi-chart-line',
        label: 'Estadísticas',
        goTo: '/app/stats'
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

export interface INavbarItem {
    icon: string;
    label: string;
    goTo: string;
}