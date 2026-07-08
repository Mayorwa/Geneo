import LogoIcon from "@/components/ui/LogoIcon";

const Header = () => {
    return (
        <div className="container my-4 flex items-center justify-between">
            <div className="flex items-center">
                <LogoIcon className="h-10 block text-white" />
                <h4 className="text-lg ml-2"><span>|</span> Herit</h4>
            </div>

            <p className="feedback-banner__text text-xs">
                <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feedback-banner__link"
                >
                    Send anonymous feedback
                </a>
                {' or '}
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out Herit — a genealogy tool for exploring family trees\n\n')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feedback-banner__link"
                >
                    share it
                </a>
            </p>
        </div>
    )
}

export default Header;