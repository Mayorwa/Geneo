interface GedcomEvent {
    event: string;  // 'birth' | 'death' | 'buried' | 'baptism' | 'cremation' | 'adoption' | 'married' | 'engagement' | 'change'
    date?: string;
    place?: string;
}

interface ILineage {
    root: IIndividual;
    partners: IIndividual[];
    parents?: IIndividual[];
    children?: IIndividual[];
    events?: GedcomEvent[]; // family-level events: marriage, engagement
}

interface IIndividual {
    id?: string;            // GEDCOM pointer, e.g. '@I001@'
    name: string;
    title?: string;
    individualType: IndividualType;
    gender: string;
    familyStarted?: string;
    familyComingFrom?: string;
    birthdate: string;
    deathdate?: string;
    occupation?: string;
    events?: GedcomEvent[]; // individual-level events
}

enum IndividualType {
    Individual = 'Individual',
    Parent = 'Parent',
    Partner = 'Partner',
    ExPartner = 'ExPartner',
    Child = 'Child'
}

export { IndividualType };
export type { IIndividual, ILineage, GedcomEvent };