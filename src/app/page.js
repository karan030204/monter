"use client"
import React, { useEffect } from "react";

import Image from "next/image";
import Aos from "aos";
import "aos/dist/aos.css"; // Import Aos CSS file

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 2000 }); // Initialize Aos with options
  }, []);

  return (
    <main className="main-wrapper">
      <div
        className="title"
        data-aos="fade-right"
        data-aos-offset="100"
        data-aos-delay="10"
        data-aos-easing="ease-in-out"
      >
        Hello, <br /> I am Karan Dattani
      </div>
      <div className="buttons">
        <div className="assignment-btn">
          <a href="/assignment" target="_blank" rel="noreferrer">
            <button type="button" 
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="10"
            data-aos-easing="ease-in-out"
            >Assignment</button>
          </a>
        </div>
        <div className="resume-btn">
          <a href="/RESUME_1.pdf" target="_blank" rel="noreferrer">
            <button type="button"
            data-aos="fade-left"
            data-aos-offset="100"
            data-aos-delay="10"
            data-aos-easing="ease-in-out"
            >Resume</button>
          </a>
        </div>
      </div>
    </main>
  );
}
