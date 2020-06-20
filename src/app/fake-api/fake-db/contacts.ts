export class ContactsFakeDb
{
    public static contacts = [
        {
            'id'      : '5725a680b3249760ea21de52',
            'name'    : 'Abbott',
            'lastName': 'Keitch',
            'avatar'  : 'assets/img/users/u1.jpg',
            'nickname': 'Royalguard',
            'company' : 'Saois',
            'jobTitle': 'Digital Archivist',
            'email'   : 'abbott@withinpixels.com',
            'phone'   : '+1-202-555-0175',
            'address' : '933 8th Street Stamford, CT 06902',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a680606588342058356d',
            'name'    : 'Arnold',
            'lastName': 'Matlock',
            'avatar'  : 'assets/img/users/u2.jpg',
            'nickname': 'Wanderer',
            'company' : 'Laotcone',
            'jobTitle': 'Graphic Artist',
            'email'   : 'arnold@withinpixels.com',
            'phone'   : '+1-202-555-0141',
            'address' : '906 Valley Road Michigan City, IN 46360',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a68009e20d0a9e9acf2a',
            'name'    : 'Barrera',
            'lastName': 'Bradbury',
            'avatar'  : 'assets/img/users/u3.jpg',
            'nickname': 'Jackal',
            'company' : 'Unizim',
            'jobTitle': 'Graphic Designer',
            'email'   : 'barrera@withinpixels.com',
            'phone'   : '+1-202-555-0196',
            'address' : '183 River Street Passaic, NJ 07055',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a6809fdd915739187ed5',
            'name'    : 'Blair',
            'lastName': 'Strangeway',
            'avatar'  : 'assets/img/users/u4.jpg',
            'nickname': 'Knight',
            'company' : 'Conedubdax',
            'jobTitle': 'Visual Designer',
            'email'   : 'blair@withinpixels.com',
            'phone'   : '+1-202-555-0118',
            'address' : '143 Jones Street Eau Claire, WI 54701',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a68007920cf75051da64',
            'name'    : 'Boyle',
            'lastName': 'Winters',
            'avatar'  : 'assets/img/users/u5.jpg',
            'nickname': 'Jester',
            'company' : 'Newo',
            'jobTitle': 'Catalogue Illustrator',
            'email'   : 'boyle@withinpixels.com',
            'phone'   : '+1-202-555-0177',
            'address' : '218 Pearl Street Brandon, FL 33510',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a68031fdbb1db2c1af47',
            'name'    : 'Christy',
            'lastName': 'Camacho',
            'avatar'  : 'assets/img/users/u7.jpg',
            'nickname': 'Mist',
            'company' : 'uniway',
            'jobTitle': '3D Animator',
            'email'   : 'christy@withinpixels.com',
            'phone'   : '+1-202-555-0136',
            'address' : '329 Bridge Street Desoto, TX 75115',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a680bc670af746c435e2',
            'name'    : 'Copeland',
            'lastName': 'Redcliff',
            'avatar'  : 'assets/img/users/u8.jpg',
            'nickname': 'Cloudlaw',
            'company' : 'Tempron',
            'jobTitle': 'Multimedia Artist',
            'email'   : 'copeland@withinpixels.com',
            'phone'   : '+1-202-555-0107',
            'address' : '956 6th Avenue North Bergen, NJ 0704',
            'birthday': '',
            'notes'   : ''
        },
        {
            'id'      : '5725a680e7eb988a58ddf303',
            'name'    : 'Estes',
            'lastName': 'Stevens',
            'avatar'  : 'assets/img/users/u9.jpg',
            'nickname': 'Roamer',
            'company' : 'nam-dex',
            'jobTitle': 'Special Effects Artist',
            'email'   : 'estes@withinpixels.com',
            'phone'   : '+1-202-555-0113',
            'address' : '664 York Street Cambridge, MA 02138',
            'birthday': '',
            'notes'   : ''
        },
    ];

    public static user = [
        {
            'id'              : '5725a6802d10e277a0f35724',
            'name'            : 'John Doe',
            'avatar'          : 'assets/images/avatars/profile.jpg',
            'starred'         : [
                '5725a680ae1ae9a3c960d487',
                '5725a6801146cce777df2a08',
                '5725a680bbcec3cc32a8488a',
                '5725a680bc670af746c435e2',
                '5725a68009e20d0a9e9acf2a'
            ],
            'frequentContacts': [
                '5725a6809fdd915739187ed5',
                '5725a68031fdbb1db2c1af47',
                '5725a680606588342058356d',
                '5725a680e7eb988a58ddf303',
                '5725a6806acf030f9341e925',
                '5725a68034cb3968e1f79eac',
                '5725a6801146cce777df2a08',
                '5725a680653c265f5c79b5a9'
            ],
            'groups'          : [
                {
                    'id'        : '5725a6802d10e277a0f35739',
                    'name'      : 'Friends',
                    'contactIds': [
                        '5725a680bbcec3cc32a8488a',
                        '5725a680e87cb319bd9bd673',
                        '5725a6802d10e277a0f35775'
                    ]
                },
                {
                    'id'        : '5725a6802d10e277a0f35749',
                    'name'      : 'Clients',
                    'contactIds': [
                        '5725a680cd7efa56a45aea5d',
                        '5725a68018c663044be49cbf',
                        '5725a6809413bf8a0a5272b1',
                        '5725a6803d87f1b77e17b62b'
                    ]
                },
                {
                    'id'        : '5725a6802d10e277a0f35329',
                    'name'      : 'Recent Workers',
                    'contactIds': [
                        '5725a680bbcec3cc32a8488a',
                        '5725a680653c265f5c79b5a9',
                        '5725a6808a178bfd034d6ecf',
                        '5725a6801146cce777df2a08'
                    ]
                }
            ]
        }
    ];
}
