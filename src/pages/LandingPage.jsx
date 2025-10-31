import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <>
            <div className="container landing-hero">
                <img src="/Pixel Wizard with Flaming Staff.png" alt="Pixel Wizard" />

                <p>
                    Welcome, brave traveler. I am Lumora, the Sage of Light. For centuries, knowledge has been our shield, yet a
                    shadow looms… Dimora, the bringer of ignorance, spreads darkness across the land. His minions — confusion,
                    doubt, and fear — seek to weaken the minds of all who walk this world.

                    But you, chosen one, have stepped upon the SagePath. Here, every lesson you master, every skill you forge,
                    is a weapon against the darkness. You will face trials as battles, earn badges as victories, and gather
                    companions who grow with you in strength.

                    Rise, seeker of wisdom. The journey ahead will test your courage and sharpen your mind. Step forth, and let
                    us drive back Dimora's shadow together, with the light of knowledge as our sword.
                </p>

                <button className="next-btn" onClick={() => navigate('/login')}>Next</button>
            </div>

            <div id="characters">
                <h3>Meet the characters</h3>
                <img src="/Screenshot 2025-09-05 143651.png" alt="Characters" />
            </div>
        </>
    );
}