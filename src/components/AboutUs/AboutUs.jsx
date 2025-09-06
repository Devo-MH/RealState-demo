import React from "react";
import AboutComponentMini from "../../subComponents/About";
const AboutUs = () => {
  return (
    <section id="aboutPage" className="page">
      <div className="container">
        <img src="/about.jpg" alt="about" />
        <div className="content">
          <h3>Your peace of mind, our priority!</h3>
          <p>
            At our core, we believe that true value comes from creating trust
            and providing solutions that make life simpler. Our mission is to
            give you the confidence and security you need, so you can focus on
            what matters most.
          </p>
          <p>
            With years of experience and a passionate team, we are committed to
            delivering reliable services, innovative approaches, and
            personalized support tailored to your unique needs. Every step we
            take is guided by integrity, transparency, and the promise of
            quality.
          </p>
          <p>
            Whether you’re seeking guidance, protection, or peace of mind, we’re
            here to ensure you feel supported and understood. Your goals become
            our goals, and your peace of mind remains our top priority.
          </p>
        </div>
      </div>
      <AboutComponentMini />
    </section>
  );
};

export default AboutUs;
