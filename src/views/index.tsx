import React, {useState} from 'react';
import TextInput from "@/components/ui/Input/TextInput.tsx";
import Icon from "@/components/ui/Icon.tsx";
import Lineage from "@/components/common/Lineage.tsx";
import {useLineage} from "@/context/LineageContext.tsx";

const IndexPage: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const { lineage: families } = useLineage();
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
               <section className="family-tree">
                   {
                       families.map((_, index) => (
                           <Lineage key={index} lineageId={index}  />
                       ))
                   }
               </section>
            </main>
        </>
    )
}

export default IndexPage;