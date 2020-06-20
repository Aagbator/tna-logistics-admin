import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours
} from 'date-fns';

export class CalendarFakeDb
{

    public static events = [
        {
            start    : subDays(startOfDay(new Date()), 1),
            end      : addDays(new Date(), 1),
            title    : 'A 3 day event',
            allDay   : true,
            color    : {
                primary  : '#FE4D2E',
                secondary: '#fedbd5'
            },
            resizable: {
                beforeStart: true,
                afterEnd   : true
            },
            draggable: true,
            meta     : {
                location: 'Los Angeles',
                notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        },
        {
            start    : startOfDay(new Date()),
            title    : 'An event with no end date',
            allDay   : false,
            color    : {
                primary  : '#FDA424',
                secondary: '#fee3bd'
            },
            resizable: {
                beforeStart: true,
                afterEnd   : true
            },
            draggable: true,
            meta     : {
                location: 'Los Angeles',
                notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        },
        {
            start    : subDays(endOfMonth(new Date()), 3),
            end      : addDays(endOfMonth(new Date()), 3),
            title    : 'A long event that spans 2 months',
            allDay   : false,
            color    : {
                primary  : '#1E90FF',
                secondary: '#D1E8FF'
            },
            resizable: {
                beforeStart: true,
                afterEnd   : true
            },
            draggable: true,
            meta     : {
                location: 'Los Angeles',
                notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        },
        {
            start    : addHours(startOfDay(new Date()), 2),
            end      : new Date(),
            title    : 'A draggable and resizable event',
            allDay   : false,
            color    : {
                primary  : '#10c99d',
                secondary: '#b7eee1'
            },
            resizable: {
                beforeStart: true,
                afterEnd   : true
            },
            draggable: true,
            meta     : {
                location: 'Los Angeles',
                notes   : 'Eos eu verear adipiscing, ex ornatus denique iracundia sed, quodsi oportere appellantur an pri.'
            }
        }
    ];
}
