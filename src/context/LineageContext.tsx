import {createContext, useContext, useState, ReactNode, useRef, RefObject} from "react";
import {ILineage, IndividualType} from "@/types";

import {sample_data} from "@/schemas";

interface LineageContextType {
    lineage: ILineage[];
    familyRefs: RefObject<HTMLDivElement[]>;
    populateIndividualLineage: (familyStartedId: string) => number;
}

const LineageContext = createContext<LineageContextType | null>(null);
const lineageData = [{
    root: {
        name: 'Don Vito Corleone',
        individualType: IndividualType.Individual,
        gender: 'male',
        familyStarted: '@F011@',
        familyComingFrom: '@F001@',
        birthdate: '1926',
        deathdate: '1999',
    },
    partners: [
        {
            name: 'Carmella Corleone',
            individualType: IndividualType.Partner,
            gender: 'female',
            familyStarted: '@F011@',
            familyComingFrom: '@F002@',
            birthdate: '1930',
            deathdate: '2003',
        },
    ],
    parents: [
        {
            name: 'Antonia Andolini',
            individualType: IndividualType.Parent,
            gender: 'male',
            familyStarted: '@F001@',
            familyComingFrom: '@F01@',
            birthdate: '1902',
            deathdate: '1973',
        },
        {
            name: 'Signora Andolini',
            individualType: IndividualType.Parent,
            gender: 'female',
            familyStarted: '@F001@',
            familyComingFrom: '@F02@',
            birthdate: '1910',
            deathdate: '1983',
        }
    ],
    children: [
        {
            name: 'Connie Corleone',
            individualType: IndividualType.Child,
            gender: 'female',
            familyStarted: '@F022@',
            familyComingFrom: '@F011@',
            birthdate: '1943',
            deathdate: '2013',
        },
        {
            name: 'Sonny Corleone',
            individualType: IndividualType.Child,
            gender: 'male',
            familyStarted: '@F023@',
            familyComingFrom: '@F011@',
            birthdate: '1945',
            deathdate: '2014',
        },
        {
            name: 'Micheal Corleone',
            individualType: IndividualType.Child,
            gender: 'male',
            familyComingFrom: '@F011@',
            familyStarted: '@F024@',
            birthdate: '1965',
        },
        {
            name: 'Fredo Corleone',
            individualType: IndividualType.Child,
            gender: 'male',
            familyComingFrom: '@F011@',
            familyStarted: '@F025@',
            birthdate: '1965',
        }
    ],
}];

export const LineageProvider = ({ children }: { children: ReactNode }) => {
    const familyRefs = useRef<HTMLDivElement[]>([]);
    familyRefs.current = [];
    const [lineage, setLineage] = useState<ILineage[]>(lineageData);

    const checkIfIndexIsOpen = (familyStartedId: string) =>
        lineage.findIndex(obj => obj.root.familyStarted === familyStartedId);

    const getOpenedSiblingsIndex = (familyComingFromId: string) =>
        lineage.findIndex(obj => obj.root.familyComingFrom === familyComingFromId);

    const populateIndividualLineage = (familyStartedId: string) => {
        const existing = checkIfIndexIsOpen(familyStartedId);
        if (existing >= 0) return existing;

        const data: ILineage = sample_data[familyStartedId];

        if (!data) return null;

        const siblingIdx = getOpenedSiblingsIndex(data?.root?.familyComingFrom);

        let newLineage = [...lineage];
        if (siblingIdx >= 0) {
            newLineage = newLineage.slice(0, siblingIdx);
        }

        // 4. Add new branch
        newLineage.push(data);

        // 5. Update state
        setLineage(newLineage);

        return newLineage.length - 1;
    };

    return (
        <LineageContext.Provider value={{ lineage, populateIndividualLineage, familyRefs}}>
            {children}
        </LineageContext.Provider>
    );
};

export const useLineage = () => {
    const ctx = useContext(LineageContext);
    if (!ctx) throw new Error("useLineage must be used inside LineageProvider");
    return ctx;
};