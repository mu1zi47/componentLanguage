import { useLanguage } from "@/context/languageContext";
import styles from "./language.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();
    const [languageModal, setLanguageModal] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null); // ✅ Добавили ref для кнопки

    const handleLanguageModal = () => {
        setLanguageModal((prev) => !prev);
    };

    // Закрытие модального окна при клике вне него
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current && !modalRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target) // ✅ Проверяем клик по кнопке
            ) {
                setLanguageModal(false);
            }
        };

        const handleScroll = () => {
            setLanguageModal(false);
        };

        if (languageModal) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("scroll", handleScroll);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [languageModal]);

    const changeLanguage = (lang) => {
        setLanguage(lang)
        handleLanguageModal()
    }

    return (
        <div className={styles.LanguageSwitcher}>
            {/* ✅ Добавили ref для кнопки */}
            <button ref={buttonRef} onClick={handleLanguageModal}>
                <Image
                    src={language === "ru" ? "/ru.svg" : "/uz.svg"}
                    alt="Language"
                    width={24}
                    height={28}
                    loading="lazy"
                />
            </button>

            <motion.div
                ref={modalRef}
                initial={{ y: 60 }}
                animate={
                    languageModal
                        ? { y: 100, opacity: 1, display: "flex" }
                        : { y: 60, opacity: 0, display: "none" }}
                style={{ display: languageModal ? "flex" : "none" }}
                transition={{ transition: "ease" }}
                className={styles.LanguageModal}>
                <button onClick={() => changeLanguage("ru")}><Image src='/ru.svg' alt="ru" width={21} height={15}/> Русский</button>
                <button onClick={() => changeLanguage("uz")}><Image src='/uz.svg' alt="uz" width={21} height={15}/> O'zbekcha</button>
            </motion.div>
        </div>
    );
};

export default LanguageSwitcher;