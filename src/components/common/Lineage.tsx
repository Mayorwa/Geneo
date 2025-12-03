import React from 'react';
import Individual from "@/components/common/Individual.tsx";
import { IndividualType, IIndividual, ILineage } from "@/types";
import {useLineage} from "@/context/LineageContext.tsx";

const Lineage: React.FC<{lineageId: number}> = ({ lineageId }) => {
    const { lineage } = useLineage();
    const family: ILineage = lineage[lineageId];
    const getRelation = (individual: IIndividual, relation: string) => {
        switch (relation) {
            case 'partner':
                if (individual.individualType === IndividualType.ExPartner) {
                    return individual.gender === 'male' ? 'ex-husband' : 'ex-wife'
                } else {
                    return individual.gender === 'male' ? 'husband' : 'wife'
                }
            case 'child':
                return individual.gender === 'male' ? 'son' : 'daughter'
            case 'parent':
                return individual.gender === 'male' ? 'father' : 'mother'
            default:
                return 'root'
        }
    }
    return (
        <>
            <div className="family-tree_branch">
                <div className="container">
                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        family?.parents?.length > 0 &&
                        (<div className="grid-outer">
                            <div className="grid grid-parents">
                                {
                                    family.parents?.map((parent: IIndividual, index: number) => (
                                        <Individual key={`parent-${parent.familyStarted}-${index}`} {...parent} relation={getRelation(parent, 'parent')} />
                                    ))
                                }
                            </div>
                        </div>
                        )
                    }

                    <div className="grid-outer">
                        <div className="grid grid-partners grid-root">
                            <Individual {...family.root} relation={getRelation(family.root, 'root')} />
                            {
                                family.partners?.map((partner: IIndividual, index: number) => (
                                    <Individual key={`partner-${partner.familyStarted}-${index}`} {...partner} relation={getRelation(partner, 'partner')} />
                                ))
                            }
                        </div>
                    </div>

                    {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        family?.children?.length > 0 && (
                        <div className="grid-outer">
                            <div className="grid grid-children" data-extended={`${family?.children?.length > 3}`}>
                                {
                                    family.children?.map((child: IIndividual, index: number) => (
                                        <Individual key={`child-${child.familyStarted}-${index}`} {...child} relation={getRelation(child, 'child')} />
                                    ))
                                }
                            </div>
                        </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Lineage;