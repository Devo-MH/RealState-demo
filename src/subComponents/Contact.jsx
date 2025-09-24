import React from "react";
import { Link } from "react-router-dom";
import { RiFacebookBoxLine, RiYoutubeLine, RiGithubLine } from "react-icons/ri";
const SubContact = () => {
    return (
        <>
            <section id="contact_Mini">
                <div className="super_container">
                    <div className="container_1">
                        <h3>Let's connect</h3>
                        <div>
                            <p>Phone</p>
                            <span>+44 548 954 2251</span>
                        </div>
                        <div>
                            <p>Email</p>
                            <span>support@cent-finance.com</span>
                        </div>
                        <div>
                            <p>Address</p>
                            <span>House No.123 Sector A-1</span>
                        </div>
                        <ul>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <RiFacebookBoxLine />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <RiFacebookBoxLine />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <RiFacebookBoxLine />
                            </a>
                        </ul>
                    </div>

                    <div className="container_2">
                        <h3>We'd love to hear from you</h3>
                        <form>
                            <div>
                                <input type="text" placeholder="Your Name" />
                                <input type="email" placeholder="Email" />
                            </div>
                            <textarea rows="4" placeholder="Your Message..." />
                            <button type="submit">SEND</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SubContact;
