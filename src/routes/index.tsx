import React from 'react'
import { Routes, Route } from 'react-router-dom'

// guards
import {LoggedOutGuard} from "@/routes/guards";

// layouts
import DefaultLayout from "@/components/layouts/defaultLayout.tsx";

// views
import IndexPage from "@/views/index.tsx"
import NotFoundPage from "@/views/NotFound/404.tsx";
import {LineageProvider} from "@/context/LineageContext.tsx";

const Router: React.FC = () => {
    return (
        <LineageProvider>
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <LoggedOutGuard>
                            <DefaultLayout children={<IndexPage />}/>
                        </LoggedOutGuard>
                    }
                />
                {/* not found */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </LineageProvider>
    )
}

export default Router
