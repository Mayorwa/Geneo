import { type ILineage, IndividualType} from "@/types";

export const sample_data = {
    "@F024@": {
        root: {
            name: 'Micheal Corleone',
            individualType: IndividualType.Individual,
            gender: 'male',
            familyComingFrom: '@F011@',
            familyStarted: '@F024@',
            birthdate: '1965',
        },
        partners: [
            {
                name: 'Kay Corleone',
                individualType: IndividualType.Partner,
                gender: 'female',
                birthdate: '1970',
                familyComingFrom: '@F078@',
                familyStarted: '@F024@',
            },
            {
                name: 'Apollonia Corleone',
                individualType: IndividualType.ExPartner,
                gender: 'female',
                birthdate: '1970',
                familyStarted: '@F049@',
            },
        ],
        children: [
            {
                name: 'Dmitry Allison',
                individualType: IndividualType.Child,
                gender: 'male',
                familyComingFrom: '@F024@',
                familyStarted: '@F048@',
                birthdate: '1997',
            },
        ]},
    "@F022@": {
        root: {
            name: 'Rachael Geller',
            individualType: IndividualType.Individual,
            gender: 'female',
            familyComingFrom: '@F011@',
            familyStarted: '@F022@',
            birthdate: '1943',
            deathdate: '2013',
        },
        partners: [
            {
                name: 'Ross Geller ',
                individualType: IndividualType.Partner,
                gender: 'male',
                birthdate: '1939',
                familyComingFrom: '@F317@',
                familyStarted: '@F022@',
            },
        ],
        children: [
            {
                name: 'Ben Geller',
                individualType: IndividualType.Child,
                gender: 'male',
                familyComingFrom: '@F022@',
                birthdate: '1965',
            },
        ]},
    "@F048@": {
        root: {
            name: 'Dmitry Allison',
            individualType: IndividualType.Individual,
            gender: 'male',
            familyComingFrom: '@F024@',
            familyStarted: '@F048@',
            birthdate: '1997',
        },
        partners: [
            {
                name: 'Phoebe Buffet',
                individualType: IndividualType.Partner,
                gender: 'female',
                birthdate: '1999',
                familyComingFrom: '@F890@',
                familyStarted: '@F048@',
            },
            {
                name: 'Ursula Buffet',
                individualType: IndividualType.ExPartner,
                gender: 'female',
                birthdate: '1999',
                familyComingFrom: '@F890@',
                familyStarted: '@F092@',
            },
        ],}
    } as Record<string, ILineage>