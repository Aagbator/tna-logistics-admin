import {Menu} from './navigation.model';
export const NAVIGATION: Menu[] = [
    {
        heading: true,
        title: 'MENU',
        icon: '',
        url: '',
        translate: '',
        children : [],
        permission: [],
    },
    {
        heading: false,
        title: 'Dashboard',
        icon: 'ft-home',
        url: '/dashboard',
        translate: '', // SIDENAV.DASHBOARDS
        children : [],
        permission: ['VIEW_REPORT'],
    },
    {
        heading: false,
        title: 'Orders',
        icon: 'ft-truck',
        url: '/orders',
        translate: '',
        children : [],
        permission: [''],
    },
    {
        heading: false,
        title: 'Products',
        icon: 'ft-layers',
        url: '/product',
        translate: '',
        children: [
            {title: 'Create', url: '/create', permission: ['CREATE_PRODUCT']},
            {title: 'Manage', url: '/manage', permission: ['UPDATE_PRODUCT', 'DELETE_PRODUCT', 'UPDATE_PRODUCT']},
        ],
        permission: [],
    },
    {
        heading: false,
        title: 'Front shop',
        icon: 'ft-monitor',
        url: '/shop',
        translate: '',
        children: [
            {title: 'Section', url: '/section', permission: ['CREATE_SECTION']},
            {title: 'Banner', url: '/banner', permission: ['CREATE_BANNER', 'UPDATE_BANNER']},
        ],
        permission: [],
    },
    {
        heading: false,
        title: 'Categories',
        icon: 'ft-grid',
        url: '/category/manage',
        translate: '', // SIDENAV.DASHBOARDS
        children : [],
        permission: ['CREATE_CATEGORY', 'UPDATE_CATEGORY', 'DELETE_CATEGORY'],
    },
    {
        heading: false,
        title: 'Coupons',
        icon: 'ft-gift',
        url: '/coupon/manage',
        translate: '', // SIDENAV.DASHBOARDS
        children : [],
        permission: ['CREATE_COUPON', 'UPDATE_COUPON', 'DELETE_COUPON'],
    },
    {
        heading: false,
        title: 'Configuration',
        icon: 'ft-settings',
        url: '/configuration',
        translate: '',
        children: [
            {title: 'Delivery cost', url: '/delivery-cost', permission: ['CREATE_USER']},
        ],
        permission: [],
    },
    {
        heading: false,
        title: 'Admins',
        icon: 'ft-user',
        url: '/admin',
        translate: '',
        children: [
            {title: 'Create', url: '/create', permission: ['CREATE_USER']},
            {title: 'Manage', url: '/manage', permission: ['UPDATE_USER', 'DELETE_USER', 'VIEW_USER', 'BLOCK_USER', 'UNBLOCK_USER']},
        ],
        permission: [],
    },
    {
        heading: false,
        title: 'Customers',
        icon: 'ft-user',
        url: '/customer/manage',
        translate: '', // SIDENAV.DASHBOARDS
        children : [],
        permission: ['CREATE_CUSTOMER', 'UPDATE_CUSTOMER', 'DELETE_CUSTOMER', 'VIEW_CUSTOMER'],
    },
    // {
    //     heading: false,
    //     title: 'Bank Payments',
    //     icon: 'ft-pocket',
    //     url: '/bank-payments/manage',
    //     translate: '', // SIDENAV.DASHBOARDS
    //     children : [],
    //     permission: ['VIEW_PAYOUT'],
    // },
    // {
    //     heading: false,
    //     title: 'Pay Out',
    //     icon: 'ft-package',
    //     url: '/payout/manage',
    //     translate: '', // SIDENAV.DASHBOARDS
    //     children : [],
    //     permission: ['VIEW_PAYOUT', 'PAYOUT'],
    // },
    {
      heading: false,
      title: 'Role Management',
      icon: 'fa fa-key',
      url: '/role',
      translate: '',
      children: [
        {title: 'Create', url: '/create', permission: ['CREATE_ROLE']},
        {title: 'Manage', url: '/manage', permission: ['DELETE_ROLE', 'UPDATE_ROLE', 'VIEW_ROLE']},
      ],
      permission: [],
    }
];

