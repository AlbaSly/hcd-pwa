
import { Carousel, CarouselResponsiveOption } from 'primereact/carousel';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { Account } from '../../interfaces';
import tinycolor from 'tinycolor2';
import { FormatUtils } from '../../utils/format-utils';
import { useApp } from '../../context/AppContext';


export default function AccountsList() {

    const {
        accounts
    } = useApp();

    const responsiveOptions: CarouselResponsiveOption[] = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    
    const accountTemplate = (account: Account) => {
        return (
            <div className="surface-0 shadow-2 p-3 border-1 border-50 border-round m-2">
                <div className="flex justify-content-between mb-3">
                    <div>
                        <div>
                            <span className="block text-500 font-medium">{account.name}</span>
                            <Tag>{account.periodicity.name}</Tag>
                        </div>
                        <p className="text-600 font-bold text-xl text-center">
                            {FormatUtils.formatToMoney(account)}{' '}
                            {account.currency.symbol_native ?? ''}
                            {account.currency.code}
                        </p>
                    </div>
                    
                    <div className='flex flex-col justify-content-center align-items-center gap-2'>
                        <div className="flex align-items-center justify-content-center border-round" style={{ width: '2.5rem', height: '2.5rem', backgroundColor: `#${account.hexColor}`}}>
                            <i className="pi pi-wallet text-xl" style={{color: "#"+tinycolor('#'+account.hexColor).darken(50).toHex().toString()}}></i>
                        </div>
                        <Button severity='info' icon="pi pi-pen-to-square" text raised style={{height: '40px', width: '40px'}}/>
                        <Button severity='danger' icon="pi pi-trash" text raised style={{height: '40px', width: '40px'}}/>
                    </div>
                </div>
                <span className="text-yellow-400 font-medium">0 {' '}</span>
                <span className="text-500">transacciones realizadas.</span>
            </div>
        )
    }
    
    return (
        <div className="card">
            <Carousel value={accounts} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} itemTemplate={accountTemplate} />
        </div>
    )
}
        