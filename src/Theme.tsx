import type { ComponentType } from "react"
import React, { useEffect, useState } from "react"

function getDefaultTheme() {
    return "light" // change to "dark" if preferred
}

function getStoredTheme() {
    if (typeof window === "undefined") return getDefaultTheme()

    return localStorage.getItem("currentToggleState") || getDefaultTheme()
}

function applyTheme(theme: string) {
    if (typeof document === "undefined") return

    document.documentElement.setAttribute("data-theme", theme)
}

export function themeSwicther(Component): ComponentType {
    return (props) => {
        const [theme, setTheme] = useState(() => getStoredTheme())

        useEffect(() => {
            applyTheme(theme)

            if (typeof window !== "undefined") {
                localStorage.setItem("currentToggleState", theme)
                window.dispatchEvent(new CustomEvent("themeChange"))
            }
        }, [theme])

        const toggle = () => {
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }

        return <Component {...props} onClick={toggle} />
    }
}