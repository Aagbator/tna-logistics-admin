export class MailsFakeDb 
{
    public static mails = [
        {
            id: '10',
            from: {
                name  : 'Olivia Smith',
                avatar: 'assets/img/users/u1.jpg',
                email : 'oliviasmith@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Lorem ipsum dolor sit amet, anim officia ad sed adipiscing commodo in amet lorem esse lorem deserunt anim labore magna proident culpa do do nisi in voluptate fugiat ut sed pariatur mollit aliquip reprehenderit excepteur cillum do sit est incididunt tempor id consequat velit dolore in magna dolore quis excepteur cillum elit culpa irure ut elit ullamco dolore in qui voluptate id ex culpa sit dolore ut laboris tempor.</p><p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in eiusmod.</p>',
            time           : 'Dec 12',
            read           : false,
            starred        : false,
            important      : false,
            hasAttachments : true,
            attachments: [
                {
                    type    : 'image',
                    fileName: 'photo1',
                    preview : 'assets/img/blog/01.jpeg',
                    size    : '0.5Mb'
                },
                {
                    type    : 'image',
                    fileName: 'photo2',
                    preview : 'assets/img/blog/02.jpeg',
                    size    : '0.8Mb'
                }
            ],
            labels: [],
            folder: 0
        },
        {
            id: '11',
            from: {
                name  : 'Ava Wilson',
                avatar: 'assets/img/users/u7.jpg',
                email : 'avawilson@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis',
            message        : '<p>Anim officia ad sed adipiscing commodo in amet lorem esse lorem deserunt anim labore magna proident culpa do do nisi in voluptate fugiat ut sed pariatur mollit aliquip reprehenderit excepteur cillum do sit est incididunt tempor.</p><p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in eiusmod.</p>',
            time           : 'Dec 12',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : true,
            attachments: [
                {
                    type    : 'image',
                    fileName: 'photo1',
                    preview : 'assets/img/blog/01.jpeg',
                    size    : '0.5Mb'
                },
                {
                    type    : 'image',
                    fileName: 'photo2',
                    preview : 'assets/img/blog/02.jpeg',
                    size    : '0.8Mb'
                }
            ],
            labels: [],
            folder: 0
        },
        {
            id: '12',
            from: {
                name  : 'John Brown',
                avatar: 'assets/img/users/u3.jpg',
                email : 'johnbrown@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Non mollit do duis id mollit duis consequat tempor aliquip consectetur',
            message        : '<p>Excepteur dolor minim non dolor duis magna culpa dolore dolor excepteur occaecat elit irure id commodo enim qui in lorem ut proident elit enim laboris ut id ut dolore aliqua labore ad sed minim duis non lorem est enim voluptate veniam sit consequat fugiat cupidatat elit cillum mollit veniam in eu laborum.</p><p>ipsum ea dolor veniam culpa incididunt ea sed consectetur ex duis cillum irure deserunt anim duis in non nostrud elit mollit nisi occaecat non esse eu dolor minim anim enim commodo ut et exercitation in sunt voluptate ea consectetur id amet ut qui sed eu non ad.</p>',
            time           : 'Dec 11',
            read           : false,
            starred        : false,
            important      : true,
            hasAttachments : false,
            labels: [],
            folder: 0
        },
        {
            id: '13',
            from: {
                name  : 'Amelia Harris',
                avatar: '',
                email : 'ameliaharris@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur.',
            message        : '<p>Ipsum fugiat sint ipsum qui do cupidatat cillum ea amet sint aliquip ipsum ut sunt ut elit elit in amet nostrud ad incididunt magna magna ad sunt minim ut do anim.</p><p>ut elit sunt deserunt eu cillum aliquip ut est enim deserunt labore exercitation enim dolore ad officia nisi magna cillum et exercitation nulla cupidatat mollit eu in enim ullamco exercitation quis sunt commodo culpa adipiscing et aliqua eu ut pariatur irure pariatur cupidatat ullamco eu aliqua esse dolore enim tempor excepteur.</p>',
            time           : 'Dec 9',
            read           : true,
            starred        : true,
            important      : false,
            hasAttachments : true,
            labels: [
                1, 2
            ],
            folder: 0
        },
        {
            id: '14',
            from: {
                name  : 'James Davis',
                avatar: 'assets/img/users/u2.jpg',
                email : 'jamesdavis@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Excepteur dolor minim non dolor duis magna culpa dolore',
            message        : '<p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in.</p><p>eiusmod anim incididunt dolore labore exercitation magna dolore est laborum labore culpa dolore esse est quis dolore ea.</p>',
            time           : 'Dec 8',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [3],
            folder: 0
        },
        {
            id: '15',
            from: {
                name  : 'Sofia Jackson',
                avatar: 'assets/img/users/u6.jpg',
                email : 'sofiajackson@creapond.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Ipsum fugiat sint ipsum qui do cupidatat cillum ea amet sint aliquip ipsum ut sunt ut elit elit in amet nostrud ad incididunt magna magna ad sunt minim ut do anim.</p><p>ut elit sunt deserunt eu cillum aliquip ut est enim deserunt labore exercitation enim dolore ad officia nisi magna cillum et exercitation nulla cupidatat mollit eu in enim ullamco exercitation quis sunt commodo culpa adipiscing et aliqua eu ut pariatur irure pariatur cupidatat ullamco eu aliqua esse dolore enim tempor excepteur.</p>',
            time           : 'Dec 6',
            read           : true,
            starred        : true,
            important      : false,
            hasAttachments : false,
            labels: [],
            folder: 0
        },
        {
            id: '16',
            from: {
                name  : 'Emma Johnson',
                avatar: '',
                email : 'emmajohnson@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in.</p><p>eiusmod anim incididunt dolore labore exercitation magna dolore est laborum labore culpa dolore esse est quis dolore ea.</p>',
            time           : 'Dec 6',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [],
            folder: 0
        },
        {
            id: '17',
            from: {
                name  : 'Mia Anderson',
                avatar: 'assets/img/users/u8.jpg',
                email : 'miaanderson@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Excepteur dolor minim non dolor duis magna culpa dolore dolor excepteur occaecat elit irure id commodo enim qui in lorem ut proident elit enim laboris ut id ut dolore aliqua labore ad sed minim duis non lorem est enim voluptate veniam sit consequat fugiat cupidatat elit cillum mollit veniam in eu laborum.</p><p>ipsum ea dolor veniam culpa incididunt ea sed consectetur ex duis cillum irure deserunt anim duis in non nostrud elit mollit nisi occaecat non esse eu dolor minim anim enim commodo ut et exercitation in sunt voluptate ea consectetur id amet ut qui sed eu non ad.</p>',
            time           : 'Dec 5',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [],
            folder: 0
        },
        {
            id: '18',
            from: {
                name  : 'Emily Thomas',
                avatar: 'assets/img/users/u9.jpg',
                email : 'emilythomas@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Ipsum fugiat sint ipsum qui do cupidatat cillum ea amet sint aliquip ipsum ut sunt ut elit elit in amet nostrud ad incididunt magna magna ad sunt minim ut do anim.</p><p>ut elit sunt deserunt eu cillum aliquip ut est enim deserunt labore exercitation enim dolore ad officia nisi magna cillum et exercitation nulla cupidatat mollit eu in enim ullamco exercitation quis sunt commodo culpa adipiscing et aliqua eu ut pariatur irure pariatur cupidatat ullamco eu aliqua esse dolore enim tempor excepteur.</p>',
            time           : 'Dec 5',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [1],
            folder: 0
        },
        {
            id: '19',
            from: {
                name  : 'Megan Jones',
                avatar: 'assets/img/users/u4.jpg',
                email : 'meganjones@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Excepteur dolor minim non dolor duis magna culpa dolore dolor excepteur occaecat elit irure id commodo enim qui in lorem ut proident elit enim laboris ut id ut dolore aliqua labore ad sed minim duis non lorem est enim voluptate veniam sit consequat fugiat cupidatat elit cillum mollit veniam in eu laborum.</p><p>ipsum ea dolor veniam culpa incididunt ea sed consectetur ex duis cillum irure deserunt anim duis in non nostrud elit mollit nisi occaecat non esse eu dolor minim anim enim commodo ut et exercitation in sunt voluptate ea consectetur id amet ut qui sed eu non ad.</p>',
            time           : 'Dec 3',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [0],
            folder: 0
        },
        {
            id: '20',
            from: {
                name  : 'Lasse Rostislav',
                avatar: '',
                email : 'lasserostislav@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in.</p><p>eiusmod anim incididunt dolore labore exercitation magna dolore est laborum labore culpa dolore esse est quis dolore ea.</p>',
            time           : 'Dec 2',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [
                3
            ],
            folder: 3
        },
        {
            id: '21',
            from: {
                name  : 'Viliam Smith',
                avatar: 'assets/img/users/u5.jpg',
                email : 'viliamsmith@example.com'
            },
            to: [
                {
                    name : 'me',
                    email: 'johndoe@example.com'
                }
            ],
            subject        : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
            message        : '<p>Minim ex consectetur ex culpa tempor consectetur adipiscing et sint quis non mollit do duis id mollit duis consequat tempor aliquip consectetur qui consectetur amet est sunt non enim sit nisi tempor consectetur excepteur incididunt est ut sit enim fugiat pariatur aliquip in commodo cupidatat eu in in pariatur in.</p><p>eiusmod anim incididunt dolore labore exercitation magna dolore est laborum labore culpa dolore esse est quis dolore ea.</p>',
            time           : 'Dec 2',
            read           : true,
            starred        : false,
            important      : false,
            hasAttachments : false,
            labels: [],
            folder: 3
        },

    ];

    public static folders = [
        {
            'id'    : 0,
            'handle': 'inbox',
            'title' : 'Inbox',
            'icon'  : 'inbox'
        },
        {
            'id'    : 1,
            'handle': 'sent',
            'title' : 'Sent',
            'icon'  : 'send'
        },
        {
            'id'    : 2,
            'handle': 'drafts',
            'title' : 'Drafts',
            'icon'  : 'drafts'
        },
        {
            'id'    : 3,
            'handle': 'spam',
            'title' : 'Spam',
            'icon'  : 'error'
        },
        {
            'id'    : 4,
            'handle': 'trash',
            'title' : 'Trash',
            'icon'  : 'delete'
        }
    ];

    public static filters = [
        {
            'id'    : 0,
            'handle': 'starred',
            'title' : 'Starred',
            'icon'  : 'star',
            'icon_color' : 'warning'
        },
        {
            'id'    : 1,
            'handle': 'important',
            'title' : 'Important',
            'icon'  : 'label',
            'icon_color' : 'danger'
        }
    ];

    public static labels = [
        {
            'id'    : 0,
            'handle': 'support',
            'title' : 'Support',
            'state_color' : 'success'
        },
        {
            'id'    : 1,
            'handle': 'shoping',
            'title' : 'Shoping',
            'state_color' : 'warning'
        },
        {
            'id'    : 2,
            'handle': 'payments',
            'title' : 'Payments',
            'state_color' : 'primary'
        },
        {
            'id'    : 3,
            'handle': 'work',
            'title' : 'Work',
            'state_color' : 'danger'
        },
        {
            'id'    : 4,
            'handle': 'social',
            'title' : 'Social',
            'state_color' : 'secondary'
        }
    ];
}
