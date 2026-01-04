import Logo from "@/assets/img/logo.svg";

const Header = () => {
    return (
        <div className="container my-4 flex items-center">
            <img alt="Logo" src={Logo} className="h-9 block logo"/>
             {/*<h4 className="text-base ml-4">Genea</h4>*/}
        </div>
    )
}

export default Header;