import React from "react";
import dna from '../images/better_dna.png';
// import { Link } from 'react-router-dom';
// import { useAuth0 } from "@auth0/auth0-react";

const Landing = () => {
    return (
        <section>
            <h1>Info</h1>
            
            
            <div class="card">
                   
                     {/*DNA*/}
                    <img class="logo"  src={dna} alt="PulsePoint Logo" width="100" height="auto"/>

                    <svg class="banner" width="800" height="auto" viewBox="0 0 1305 679" fill="none" xmlns="http://www.w3.org/2000/svg">

                        {/*waves*/}
                        <rect width="1305" height="679" rx="25" fill="url(#paint0_linear_2319_77)"/><path d="M1312 600C933.698 618.879 141.259 589.565 6 632" stroke="white"/><path d="M6 90.5C962 144 1297 204 1297 0.5" stroke="white"/><path d="M6 247.43C973.857 267.848 1312 271.665 1312 194" stroke="white"/><path d="M6 462C976.836 473.913 1311.5 472.64 1311.5 500" stroke="white"/><path d="M6 360C977.58 361.009 1312 361 1312 361" stroke="white"/>
                        

                        {/*banner*/}
                        <defs>
                        <linearGradient id="paint0_linear_2319_77" x1="652.5" y1="0" x2="652.5" y2="679" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E9EFFD"/>
                        <stop offset="1" stop-color="#F3EBF6"/>
                        </linearGradient>
                        </defs>
                    </svg>
                
                
            </div>
            
        </section>
    );
}

export default Landing;