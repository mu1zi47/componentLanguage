import { useLanguage } from "@/context/languageContext";
import styles from "./language.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [languageModal, setLanguageModal] = useState(false);

    return (
        <div className={styles.LanguageSwitcher}>
            <button onClick={() => setLanguageModal(!languageModal)}>
                <Image src={language === "en" ? "/en.svg" : "/ru.svg"} alt="Language" width={24} height={28} loading="lazy"/>
            </button>

            <motion.div
                initial={{ y: 60 }} transition={{ transition: "ease" }} style={{ display: languageModal ? "flex" : "none" }}
                animate={languageModal ? { y: 80, opacity: 1, display: "flex" } : { y: 60, opacity: 0, display: "none" }}
                className={styles.LanguageModal}>
                <button onClick={() => {setLanguage("en"), setLanguageModal(false)}}><Image src='/en.svg' alt="en" width={21} height={15}/> English</button>
                <button onClick={() => changeLanguage("ru")}><Image src='/ru.svg' alt="ru" width={21} height={15}/> Русский</button>
            </motion.div>
        </div>
    );
};

export default LanguageSwitcher;