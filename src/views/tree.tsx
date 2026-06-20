import React, {useState} from 'react';
import TextInput from "@/components/ui/Input/TextInput.tsx";
import Icon from "@/components/ui/Icon.tsx";
import Lineage from "@/components/common/Lineage.tsx";
import {useLineage} from "@/context/LineageContext.tsx";
import DocRuler from "@/components/ui/DocRuler.tsx";

const FamilyPage: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const { lineage: families, familyRefs } = useLineage();
    // Smooth scroll with the same easeOutCubic / 750ms as the original
    const animateScrollTo = (targetY: number)=>  {
        const startY = window.scrollY
        const distance = targetY - startY
        const duration = 750
        const start = performance.now()
        function step(now: number) {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            window.scrollTo(0, startY + distance * eased)
            if (t < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }

    const sectionEl = (id: string)=>  {
        return document.getElementById(id)
    }

    const navigate = (id: string) =>  {
        const go = () => {
            if (id === 'intro') {
                animateScrollTo(0)
            }else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                animateScrollTo(sectionEl(id).getBoundingClientRect().top + window.scrollY)
            }
        }
        setTimeout(go, 300)
    }
    return (
        <>
            <main className="py-8">
                <div className="container mx-auto">
                    <div className="relative">
                        <div>
                            <Icon name="search" className="w-4 h-4 absolute -translate-y-1/2 top-1/2 left-[1rem] pointer-events-none z-[2]" />
                        </div>
                        <TextInput
                            id="search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Tree"
                            inputClasses="border-b border-solid border-gray-30 px-10"
                        />
                    </div>
                </div>
                <section className="relative">
                    <div className="family-tree">
                        {
                            families.map((l, index) => (
                                <Lineage key={index} lineageId={index} refCallback={(el) => (familyRefs.current[l?.root?.familyStarted] = el)}  />
                            ))
                        }
                    </div>
                    <DocRuler activeSection={"intro"} onNavigate={navigate}/>
                </section>
            </main>
        </>
    )
}

export default FamilyPage;