import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations/translations";
function Header() {
    const { language, setLanguage } = useContext(LanguageContext);
    const text = translations[language];
    return (
        <header className="hero">
            <div className="language-selector">

    🌐

    <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
    >

        <option value="English">
            English
        </option>

        <option value="Hindi">
            हिंदी
        </option>

        <option value="Gujarati">
            ગુજરાતી
        </option>

    </select>

</div>

            <div className="hero-content">

               <h1>
    {text.title}
</h1>

                <p>
    {text.subtitle}
</p>

                <p>
    {text.heroDescription}
</p>

            </div>

        </header>
    );
}

export default Header;