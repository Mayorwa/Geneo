import Logo from "@/assets/img/logo.svg";

const Header = () => {
    return (
        <div className="container my-4 flex items-center">
            <img alt="Logo" src={Logo} className="h-10 block logo"/>
             <h4 className="text-lg ml-2"><span>|</span> Herit</h4>
        </div>
    )
}

export default Header;