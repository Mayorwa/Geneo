interface ILineage {
    root: IIndividual;
    partners: IIndividual[];
    parents?: IIndividual[];
    children?: IIndividual[];
}

interface IIndividual{
    name: string;
    individualType: IndividualType;
    gender: string;
    familyStarted?: string,
    familyComingFrom?: string,
    birthdate: string,
    deathdate?: string,
}

enum IndividualType {
    Individual = 'Individual',
    Parent = 'Parent',
    Partner = 'Partner',
    ExPartner = 'ExPartner',
    Child = 'Child'
}

export { IndividualType };
export type { IIndividual, ILineage };