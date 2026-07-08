import LogoIcon from "@/components/ui/LogoIcon";
import './FeedbackBanner.css';

const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__inner container">
                <div className="footer__brand">
                    <LogoIcon className="footer__logo h-10 text-black" />
                </div>

                <div className="footer__col">
                    <h3 className="text-lg">Herit</h3>
                    <p className="footer__text">© {year}</p>
                </div>

                <div className="footer__col">
                    <h3 className="footer__heading">About</h3>
                    <p className="footer__text">
                        A genealogy tool for exploring and visualizing family trees from GEDCOM files.
                    </p>
                </div>

                <div className="footer__col">
                    <h3 className="footer__heading">Feedback</h3>
                    <p className="footer__text">
                        Tell us what you{' '}
                        <a
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__link"
                        >
                            want to see
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
