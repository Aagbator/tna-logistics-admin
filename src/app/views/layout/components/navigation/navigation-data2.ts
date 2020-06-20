
export const NAVIGATION: any[] = [
    {
        heading: true,
        title: 'APPLICATIONS'
    },
    {
        title: 'Dashboards',
        icon: 'ft-home',
        url: '',
        translate: 'SIDENAV.DASHBOARDS',
        childrens: [
            {title: 'Dashboard v1', url: '/index', exact: true},
            {title: 'Dashboard v2', url: '/apps/dashboards/dashboard2'},
            {title: 'Dashboard v3', url: '/apps/dashboards/dashboard3'},
        ]
    },
    {
        title: 'Mailbox',
        url: '/apps/mail',
        icon: 'ft-mail',
        translate: 'SIDENAV.MAILBOX',
    },
    {
        title: 'Chat',
        url: '/apps/chat',
        icon: 'ft-message-square',
        translate: 'SIDENAV.CHAT',
    },
    {
        title: 'FAQS',
        url: '/apps/faqs/',
        icon: 'ft-help-circle',
        childrens: [
            {title: 'FAQ v1', url: 'faq'},
            {title: 'FAQ v2', url: 'faq-v2'},
        ]
    },
    {
        title: 'Knowledge Base',
        url: '/apps/knowledge-base',
        icon: 'ft-briefcase',
        translate: 'SIDENAV.KNOWLADGE_BASE',
    },
    {
        title: 'Calendar',
        url: '/apps/calendar',
        icon: 'ft-calendar',
        translate: 'SIDENAV.CALENDAR',
    },
    {
        title: 'Contacts',
        url: '/apps/contacts',
        icon: 'ft-users',
        translate: 'SIDENAV.CONTACTS',
    },
    {
        heading: true,
        title: 'UI INTERFACE'
    },
    {
        title: 'NgBootstrap',
        icon: 'ft-package',
        url: '/ngbootstrap',
        childrens: [
            {title: 'Accordion', url: '/accordion'},
            {title: 'Alert', url: '/alert'},
            {title: 'Buttons', url: '/buttons'},
            {title: 'Carousel', url: '/carousel'},
            {title: 'Collapse', url: '/collapse'},
            {title: 'Datepicker', url: '/datepicker'},
            {title: 'Dropdown', url: '/dropdown'},
            {title: 'Modal', url: '/modal'},
            {title: 'Pagination', url: '/pagination'},
            {title: 'Popover', url: '/popover'},
            {title: 'Progressbar', url: '/progressbar'},
            {title: 'Rating', url: '/rating'},
            {title: 'Tabset', url: '/tabset'},
            {title: 'Timepicker', url: '/timepicker'},
            {title: 'Tooltip', url: '/tooltip'},
            {title: 'Typeahead', url: '/typeahead'},
        ],
    },
    {
        title: 'Angular Material',
        url: '/angular-material',
        icon: 'ft-package',
    },
    {
        title: 'Ui Kit',
        icon: 'ft-package',
        url: '/ui',
        childrens: [
            {title: 'Buttons', url: '/buttons'},
            {title: 'Badges', url: '/badges'},
            {title: 'List Group', url: '/list-group'},
            {title: 'Media List', url: '/media-list'},
            {title: 'Tables', url: '/tables'},
            {
                title: 'Forms',
                url: '/forms',
                childrens: [
                    {title: 'Inputs', url: '/inputs'},
                    {title: 'Switch', url: '/switch'},
                    {title: 'Checkbox & Radio', url: '/checkbox-radio'},
                    {title: 'Input Group', url: '/input-group'},
                    {title: 'Form Layout', url: '/form-layout'},
                ],
            }
        ],
    },
    {
        title: 'Cards',
        icon: 'ft-layers',
        url: '/ui/cards',
        childrens: [
            {title: 'Cards', url: '/cards'},
            {title: 'Card Actions', url: '/card-actions'},
        ],
    },
    {
        title: 'NGX Datatables',
        url: '/ui/ngx-datatables',
        icon: 'ft-grid',
    },
    {
        title: 'Material Tables',
        icon: 'ft-grid',
        url: '/ui/material-datatables',
        childrens: [
            {title: 'Paginator', url: '/paginator'},
            {title: 'Sort header', url: '/sort-header'},
            {title: 'Table', url: '/table'},
        ],
    },
    {
        title: 'Charts',
        icon: 'ft-bar-chart',
        url: '/charts',
        childrens: [
            {title: 'Chart.js', url: '/chartjs'},
            {title: 'NGX Charts', url: '/ngx-charts'},
        ],
    },
    {
        title: 'Maps',
        url: '/google-maps',
        icon: 'ft-map',
    },
    {
        title: 'NGX Dropzone',
        url: '/ui/ngx-dropzone',
        icon: 'ft-upload',
    },
    {
        title: 'Icons',
        url: '/ui/icons',
        icon: 'ft-circle',
    },
    {
        title: 'State Colors',
        url: '/ui/state-colors',
        icon: 'ft-circle',
    },
    {
        title: 'Typography',
        url: '/ui/typography',
        icon: 'ft-circle',
    },
    {
        heading: true,
        title: 'PAGES'
    },
    {
        title: 'Authentication',
        icon: 'ft-lock',
        url: '/snippets/auth/',
        childrens: [
            {title: 'Login', url: 'login'},
            {title: 'Login v2', url: 'login-v2'},
            {title: 'Login v3', url: 'login-v3'},
            {title: 'Sign Up', url: 'sign-up'},
            {title: 'Forgot password', url: 'forgot-password'},
            {title: 'Lockscreen', url: 'lockscreen'},
        ],
    },
    {
        title: 'Pricing Tables',
        icon: 'ft-sliders',
        url: '/pages/',
        childrens: [
            {title: 'Pricing Table v1', url: 'pricing-table-v1'},
            {title: 'Pricing Table v2', url: 'pricing-table-v2'},
        ],
    },
    {
        title: 'Profiles',
        icon: 'ft-user',
        url: '/pages/',
        childrens: [
            {title: 'Profile v1', url: 'profile-v1'},
            {title: 'Profile v2', url: 'profile-v2'},
        ],
    },
    {
        title: 'Search Results',
        url: '/pages/search-results',
        icon: 'ft-search',
    },
    {
        title: 'Invoice',
        url: '/pages/invoice',
        icon: 'ft-file-text',
    },
    {
        title: 'Timelines',
        icon: 'ft-activity',
        url: '/pages/',
        childrens: [
            {title: 'Timeline Lists', url: 'timeline-lists'},
            {title: 'Timeline Vertical', url: 'timeline-vertical'},
            {title: 'Timeline Horizontal', url: 'timeline-horizontal'},
        ],
    },
    {
        title: 'Errors',
        icon: 'ft-alert-triangle',
        url: '/snippets/',
        childrens: [
            {title: '404 error', url: 'error-404'},
            {title: '500 error', url: 'error-500'},
        ],
    },

];

