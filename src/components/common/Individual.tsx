import React, {useState} from "react";
import { IIndividual, IndividualType } from "@/types";
import Icon from "@/components/ui/Icon.tsx";
import Loader from "@/components/ui/Loader.tsx";
import { useLineage } from "@/context/LineageContext";

interface Props extends IIndividual{
    relation: string;
    key?: string;
}

const Individual: React.FC<Props> = (props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { populateIndividualLineage, familyRefs } = useLineage();
    const classes = () => {
        const variant = getIndividualClass(props.individualType)

        return `${variant} `
    }

    const isChild = () => {
        return props.individualType === IndividualType.Child;
    }

    const getIndividualClass = (individual: IndividualType) => {
        if (individual === IndividualType.Child) {
            return `card-childNode`
        } else if (individual === IndividualType.Partner) {
            return `card-subNode`
        } else if (individual === IndividualType.ExPartner) {
            return `card-Node`
        } else if (individual === IndividualType.Individual) {
            return `card-root`
        } else if (individual === IndividualType.Parent) {
            return `card-parentNode`
        }
    }

    const handleIndividualLineage = async (familyStartedId: string) => {
        setLoading(true);
        const resIdx= populateIndividualLineage(familyStartedId);
        if (resIdx !== undefined && resIdx !== null) {
            // Wait for DOM update
            requestAnimationFrame(() => {
                const familyEl = familyRefs.current[familyStartedId];
                if (familyEl) {
                    familyEl.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            });
        }
        setLoading(false);
    }

    return (
        <>
            <div className={`card ${classes()}`}>
                {
                    props.relation !== 'root' &&
                    <div className="card-label">
                        <span className="card-label_inner">{ props.relation }</span>
                    </div>
                }

                <div className="card-img" style={{ backgroundImage: "url('/default-portrait1.jpg')" }}></div>
                <div className="card-content">
                    <div className="card-content_inner">
                        <h3>{ props.name}</h3>
                        <p>({ `${props.birthdate} ${props.deathdate ? ` - ${props.deathdate}` :  ''}` })</p>
                    </div>
                </div>
                {
                    (isChild() && props?.familyStarted) &&
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    <div className="card-options" onClick={() => handleIndividualLineage(props?.familyStarted)}>
                        <div className="card-options_branch">
                            {
                            loading ?
                                <Loader />
                                :
                                <Icon name="children" width="16px" height="16px"/>
                            }
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Individual