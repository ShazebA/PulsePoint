import React from "react";
import dna from '../images/better_dna.png';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import LandingNav from "../components/LandingNav";

const Landing = () => {
    const { isAuthenticated, loginWithRedirect} = useAuth0();
    return (
        <>
            <LandingNav />
            <section>
                <div class="hero">
                    <div class="banner">
                        <svg class="waves" width="1313" height="644" viewBox="0 0 1313 644" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1312 600C933.698 618.879 141.259 589.565 6 632" stroke="#FBFBFB" opacity="0.5"/>
                            <path d="M6 90.5C962 144 1297 204 1297 0.5" stroke="#FBFBFB" opacity="0.5"/>
                            <path d="M6 247.43C973.857 267.848 1312 271.665 1312 194" stroke="#FBFBFB" opacity="0.5"/>
                            <path d="M6 462C976.836 473.913 1311.5 472.64 1311.5 500" stroke="#FBFBFB" opacity="0.5"/>
                            <path d="M6 360C977.58 361.009 1312 361 1312 361" stroke="#FBFBFB" opacity="0.5"/>
                        </svg>
                        <div class="hero-message">
                            <h2>The Future of Urgent Care</h2>
                            <h1>PulsePoint</h1>
                            <p>
                            PulsePoint brings the Blockchain solution to<br></br>
                            emergency room off-loading.
                            </p>
                            {isAuthenticated ? 
                            <Link to="/dashboard">Enter Dashboard</Link>: 
                            <Link onClick={() => loginWithRedirect()}>Get Started</Link>}
                        </div>
                        <img class="dna" src={dna} alt="DNA Graphic"/>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Landing;