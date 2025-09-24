import React from "react";

const About = () => {
    return (
        <>
            <section id="aboutUs_Mini">
                <div className="first_container">
                    <div className="content">
                        <h1>ABOUT US</h1>
                        <p>
                            At <strong>Property Rental</strong>, our mission is
                            simple — to make finding and renting a home
                            stress-free, transparent, and enjoyable. We believe
                            that your living space should give you comfort and
                            peace of mind.
                        </p>
                        <p>
                            With a growing network of trusted property owners
                            and tenants, we connect people with the right homes
                            in the right locations. From modern city apartments
                            to peaceful retreats, we’re here to provide options
                            that fit your lifestyle.
                        </p>
                        <p>
                            Our team is dedicated to ensuring every rental
                            experience is safe, fair, and straightforward. With
                            personalized support and innovative tools, we’re
                            redefining the way people rent properties.
                        </p>
                        <p>
                            We’re not just about properties — we’re about
                            people, trust, and building lasting connections.
                        </p>
                    </div>
                    <button>
                        We strive to offer you best possible homes to stay!
                    </button>
                </div>
                <div className="second_container">
                    <div className="image_1">
                        <img src="/people.jpg" alt="people" />
                    </div>
                    <div className="image_2">
                        <img src="/people2.jpg" alt="people2" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;
