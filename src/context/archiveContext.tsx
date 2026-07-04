import { createContext, useContext, useState, ReactNode, useRef, RefObject } from "react";
import { ILineage, IndividualType } from "@/types";
import { loadGedcom } from "@/utils/gedcomLoader";
import { sample_data } from "@/schemas";

const STORAGE_KEY = 'herit_lineage';

interface LineageContextType {
    lineage: ILineage[];
    familyRefs: RefObject<HTMLDivElement[]>;
    populateIndividualLineage: (familyStartedId: string) => number | null;
    loadFromGedcom: (file: File) => Promise<void>;
    clearLineage: () => void;
    isLoading: boolean;
    loadError: string | null;
}

const LineageContext = createContext<LineageContextType | null>(null);

const mockLineageData: ILineage[] = [{
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

/** Try to load persisted lineage from localStorage */
function loadFromStorage(): ILineage[] | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored) as ILineage[];
    } catch {
        // corrupted storage — ignore
    }
    return null;
}

/** Persist lineage to localStorage */
function saveToStorage(lineage: ILineage[]): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lineage));
    } catch {
        // storage quota exceeded or unavailable — fail silently
    }
}

export const LineageProvider = ({ children }: { children: ReactNode }) => {
    const familyRefs = useRef<HTMLDivElement[]>([]);
    familyRefs.current = [];

    const [lineage, setLineage] = useState<ILineage[]>(() => loadFromStorage() ?? mockLineageData);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const checkIfIndexIsOpen = (familyStartedId: string) =>
        lineage.findIndex(obj => obj.root.familyStarted === familyStartedId);

    const getOpenedSiblingsIndex = (familyComingFromId: string) =>
        lineage.findIndex(obj => obj.root.familyComingFrom === familyComingFromId);

    const populateIndividualLineage = (familyStartedId: string) => {
        const existing = checkIfIndexIsOpen(familyStartedId);
        if (existing >= 0) return existing;

        const data: ILineage = sample_data[familyStartedId];
        if (!data) return null;

        const siblingIdx = getOpenedSiblingsIndex(data?.root?.familyComingFrom ?? '');

        let newLineage = [...lineage];
        if (siblingIdx >= 0) {
            newLineage = newLineage.slice(0, siblingIdx);
        }

        newLineage.push(data);
        setLineage(newLineage);

        return newLineage.length - 1;
    };

    const loadFromGedcom = async (file: File): Promise<void> => {
        setIsLoading(true);
        setLoadError(null);
        try {
            const parsed = await loadGedcom(file);
            setLineage(parsed);
            saveToStorage(parsed);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to parse GEDCOM file.';
            setLoadError(message);
            throw err; // re-throw so the upload page can handle it too
        } finally {
            setIsLoading(false);
        }
    };

    const clearLineage = () => {
        localStorage.removeItem(STORAGE_KEY);
        setLineage(mockLineageData);
    };

    return (
        <LineageContext.Provider value={{ lineage, populateIndividualLineage, familyRefs, loadFromGedcom, clearLineage, isLoading, loadError }}>
            {children}
        </LineageContext.Provider>
    );
};

export const useLineage = () => {
    const ctx = useContext(LineageContext);
    if (!ctx) throw new Error("useLineage must be used inside LineageProvider");
    return ctx;
};
