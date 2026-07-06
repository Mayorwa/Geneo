import './FeedbackBanner.css'

const FeedbackBanner = () => {

    return (
        <div className="feedback-banner">
            <div className="container feedback-banner__inner">
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
        </div>
    )
}

export default FeedbackBanner
