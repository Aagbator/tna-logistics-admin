export class FaqFakeDb
{
    public static categories = [
        {
            id: 1,
            title: 'General',
            state_color: 'primary',
        },
        {
            id: 2,
            title: 'Profile',
            state_color: 'warning',
        },
        {
            id: 3,
            title: 'Support',
            state_color: 'success',
        },
        {
            id: 4,
            title: 'Payments',
            state_color: 'danger',
        },
        {
            id: 5,
            title: 'Shopping',
            state_color: 'secondary',
        }
    ];

    public static data = [
        {
            id: 1,
            question: 'Consectetur ullamco ad consequat veniam ut ut.',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            category: 1,
        },
        {
            id: 2,
            question: 'Nostrud ut magna occaecat proident sint aliqua',
            answer: 'Mollit in officia ut qui ut laborum cillum dolor commodo et enim incididunt ea velit quis qui magna esse ea et deserunt aliquip pariatur proident.',
            category: 1,
        },
        {
            id: 3,
            question: 'Aute dolore sint sit elit amet ad',
            answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
            category: 2
        },
        {
            id: 4,
            question: 'Excepteur dolor minim non dolor duis magna.',
            answer: 'cupidatat elit cillum mollit veniam in eu laborum reprehenderit ipsum ea dolor veniam culpa incididunt ea sed consectetur ex duis cillum irure deserunt.',
            category: 4,
        },
        {
            id: 5,
            question: 'Fugiat sint ipsum qui do cillum ut ut.',
            answer: 'deserunt anim labore magna proident culpa do do nisi in voluptate fugiat ut sed pariatur mollit aliquip reprehenderit.',
            category: 3,
        },
        {
            id: 6,
            question: 'Ullamco ad consequat veniam ut ut.',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            category: 2,
        },
        {
            id: 7,
            question: 'Minim ex consectetur ex consectetur adipiscing et .',
            answer: 'Mollit in officia ut qui ut laborum cillum dolor commodo et enim incididunt ea velit quis qui magna esse ea et deserunt aliquip pariatur proident.',
            category: 3,
        },
        {
            id: 8,
            question: 'Mollit do duis id mollit duis consequat tempor.',
            answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
            category: 4,
        },
        {
            id: 9,
            question: 'Pariatur dolore incididunt ut dolore commodo.',
            answer: 'Mollit in officia ut qui ut laborum cillum dolor commodo et enim incididunt ea velit quis qui magna esse ea et deserunt aliquip pariatur proident.',
            category: 1,
        },
        {
            id: 10,
            question: 'laboris do veniam non magna ea culpa duis.',
            answer: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.',
            category: 3,
        },
    ];

}
