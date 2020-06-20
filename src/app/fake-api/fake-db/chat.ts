export class ChatFakeDb
{

    public static chats = [
        {
            'id'    : '001',
            'dialog': [
                {
                    'who'    : 2,
                    'message': 'Lorem ipsum dolor sit amet, consectetur.',
                    'time'   : '2017-03-22T08:54:28.299Z'
                },
                {
                    'who'    : 1,
                    'message': 'Minim ex consectetur ex culpa',
                    'time'   : '2017-03-22T08:55:28.299Z'
                },
                {
                    'who'    : 2,
                    'message': 'Lorem ipsum dolar set amet',
                    'time'   : '2017-03-22T09:00:28.299Z'
                },
                {
                    'who'    : 2,
                    'message': 'Excepteur dolor minim',
                    'time'   : '2017-03-22T09:00:28.299Z'
                },
                {
                    'who'    : 1,
                    'message': 'Proident eu ullamco consectetur nulla enim.',
                    'time'   : '2017-03-22T08:55:28.299Z'
                },
                {
                    'who'    : 2,
                    'message': 'Hi! I agree with you.',
                    'time'   : '2017-03-22T09:00:28.299Z'
                },
            ]
        },
        {
            'id'    : '002',
            'dialog': [
                {
                    'who'    : 3,
                    'message': 'Quickly come to the meeting room 1B, we have a big server issue',
                    'time'   : '2017-03-22T08:54:28.299Z'
                },
                {
                    'who'    : 1,
                    'message': 'I’m having breakfast right now, can’t you wait for 10 minutes?',
                    'time'   : '2017-03-22T08:55:28.299Z'
                },
                {
                    'who'    : 3,
                    'message': 'We are losing money! Quick!',
                    'time'   : '2017-03-22T09:00:28.299Z'
                },
            ]
        },
        {
            'id'    : '003',
            'dialog': [
                {
                    'who'    : 2,
                    'message': 'Quickly come to the meeting room 1B, we have a big server issue',
                    'time'   : '2017-03-22T08:54:28.299Z'
                },
                {
                    'who'    : 1,
                    'message': 'I’m having breakfast right now, can’t you wait for 10 minutes?',
                    'time'   : '2017-03-22T08:55:28.299Z'
                },
                {
                    'who'    : 2,
                    'message': 'We are losing money! Quick!',
                    'time'   : '2017-03-22T09:00:28.299Z'
                },
            ]
        },
    ];

    public static users = [
        {
            'id'    : 2,
            'chatId': '001',
            'name'  : 'Olivia Smith',
            'avatar': 'assets/img/users/u1.jpg',
            'status': 'offline',
            'lastMessage' : 'Hi! I agree with you.',
            'lastMessageTime' : '2 hours ago',
        },
        {
            'id'    : 3,
            'chatId': '002',
            'name'  : 'James Davis',
            'avatar': 'assets/img/users/u2.jpg',
            'status': 'offline',
            'lastMessage' : 'Lorem ipsum dolor sit amet.',
            'lastMessageTime' : '2 hours ago',
        },
        {
            'id'    : 4,
            'chatId': '003',
            'name'  : 'John Brown',
            'avatar': 'assets/img/users/u3.jpg',
            'status': 'online',
            'lastMessage' : 'Lorem ipsum dolor sit amet.',
            'lastMessageTime' : '2 hours ago',
        },
        {
            'id'    : 5,
            'chatId': '003',
            'name'  : 'Emma Johnson',
            'avatar': 'assets/img/users/u4.jpg',
            'status': 'offline',
            'lastMessage' : 'Lorem ipsum dolor sit amet.',
            'lastMessageTime' : '2 hours ago',
        },
        {
            'id'    : 6,
            'chatId': '003',
            'name'  : 'Ava Wilson',
            'avatar': 'assets/img/users/u7.jpg',
            'status': 'online',
            'lastMessage' : 'Lorem ipsum dolor sit amet.',
            'lastMessageTime' : '2 hours ago',
        },
        {
            'id'    : 7,
            'chatId': '003',
            'name'  : 'Sofia Jackson',
            'avatar': 'assets/img/users/u6.jpg',
            'status': 'offline',
            'lastMessage' : 'Lorem ipsum dolor sit amet.',
            'lastMessageTime' : '2 hours ago',
        },

    ];

}
