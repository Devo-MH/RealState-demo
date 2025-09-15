import React from "react";

const Regions = () => {
    return (
        <>
            <section id="regions">
                <h1>OUR REGIONS</h1>
                <p>
                    Explore the most sought-after destinations where comfort
                    meets convenience. Whether you’re drawn to peaceful mountain
                    escapes or vibrant coastal living, we’ve got the perfect
                    rental options for you.
                </p>
                <div className="region_container">
                    <div className="card">
                        <img src="/region1.jpg" alt="mountains" />
                        <h2>Mountains</h2>
                        <p>
                            <span>90</span> Properties
                        </p>
                    </div>
                    <div className="card">
                        <img src="/region2.jpg" alt="coastline" />
                        <h2>Coastline</h2>
                        <p>
                            <span>52</span> Properties
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Regions;
