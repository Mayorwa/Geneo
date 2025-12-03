import {ReactElement} from "react";

function LoggedOutGuard({ children }: { children: ReactElement }) {
    return children;
}

export { LoggedOutGuard };