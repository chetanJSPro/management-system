import React, { useState } from "react";
import "../styles/profile.css";
import Layout from "../components/layout";
const ProfilePage = () => {
    const [theme, setTheme] = useState("blue");

    const handleThemeChange = (theme) => {
        setTheme(theme);
    };

    return (
        <Layout>
            <div className={`profile-page ps-5 col-8 mt-5 pt-5  theme-${theme}`}>
                <main className="cd__main">
                    <div className=" pb-5">
                        <div className="content">
                            <div className="content__cover">
                                <div className="content__avatar"></div>
                                <div className="content__bull">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>

                            <div className="content__actions">
                                <a href="#">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                                    <path fill="currentColor" d="M192 256A112 112 0 1 0 80 144a111.94 111.94 0 0 0 112 112zm76.8 32h-8.3a157.53 157.53 0 0 1-68.5 16c-24.6 0-47.6-6-68.5-16h-8.3A115.23 115.23 0 0 0 0 403.2V432a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48v-28.8A115.23 115.23 0 0 0 268.8 288z" />
                                    <path fill="currentColor" d="M480 256a96 96 0 1 0-96-96 96 96 0 0 0 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592a48 48 0 0 0 48-48 111.94 111.94 0 0 0-112-112z" />
                                </svg>
                                <span>Connect</span> */}
                                </a>
                                <a href="#">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path fill="currentColor" d="M208 352c-41 0-79.1-9.3-111.3-25-21.8 12.7-52.1 25-88.7 25a7.83 7.83 0 0 1-7.3-4.8 8 8 0 0 1 1.5-8.7c.3-.3 22.4-24.3 35.8-54.5-23.9-26.1-38-57.7-38-92C0 103.6 93.1 32 208 32s208 71.6 208 160-93.1 160-208 160z" />
                                    <path fill="currentColor" d="M576 320c0 34.3-14.1 66-38 92 13.4 30.3 35.5 54.2 35.8 54.5a8 8 0 0 1 1.5 8.7 7.88 7.88 0 0 1-7.3 4.8c-36.6 0-66.9-12.3-88.7-25-32.2 15.8-70.3 25-111.3 25-86.2 0-160.2-40.4-191.7-97.9A299.82 299.82 0 0 0 208 384c132.3 0 240-86.1 240-192a148.61 148.61 0 0 0-1.3-20.1C522.5 195.8 576 253.1 576 320z" />
                                </svg>
                                <span>Message</span> */}
                                </a>
                            </div>

                            <div className="content__title">
                                <h1>Samantha Jones</h1>
                                <span>New York, United States</span>
                            </div>

                            <div className="content__description">
                                <p>Web Producer - Web Specialist</p>
                                <p>Columbia University - New York</p>
                            </div>

                            <ul className="content__list">
                                <li>
                                    <span>65</span>Friends
                                </li>
                                <li>
                                    <span>43</span>Photos
                                </li>
                                <li>
                                    <span>21</span>Comments
                                </li>
                            </ul>

                            <div className="content__button">
                                <a className="button" href="#">
                                    <div className="button__border"></div>
                                    <div className="button__bg"></div>
                                    <p className="button__text">Show more</p>
                                </a>
                            </div>
                        </div>

                        <div className="theme-switcher-wrapper" id="theme-switcher-wrapper">
                            <span>Themes color</span>
                            <ul>
                                {["orange", "green", "purple", "blue"].map((color) => (
                                    <li key={color}>
                                        <em
                                            className={theme === color ? "is-active" : ""}
                                            data-theme={color}
                                            onClick={() => handleThemeChange(color)}
                                        ></em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>

            </div>
        </Layout>
    );
};

export default ProfilePage;