import LuroCard from "../components/luro-card";
function Homepage() {
    console.log("Homepage rendered");
    return (
        <>
            <div className="main-container">

                <img id="mascot-img" src="/Pixel Wizard with Flaming Staff.png" alt="mascot"></img>

                <span id="mascot">Welcome Abhigyan</span>
                <span className="dialoguebox">Choose your Luro to begin your journey...</span>

                <div className="luro">
                    <LuroCard />
                </div>
            </div>
        </>
    )
}

export default Homepage;