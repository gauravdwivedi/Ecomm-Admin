import { MenuItem } from "./menu.model";


export const SELLER_MENU:MenuItem[]=[
    {
        label:'SELLER',
        isTitle:true
    },
    {
        label:'Product',
        icon:'home',
        expanded:true,
        subItems:[{
            label:'List',
            link:'/product/sellers/list'
        }]
    },
    {
        label:'Orders',
        icon:'dollar-sign',
        expanded:true,
        subItems:[
            {
                label:'List',
                link:'/orders/sellers/list'
            }
        ]
    }
]