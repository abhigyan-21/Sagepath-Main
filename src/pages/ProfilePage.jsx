export default function ProfilePage() {
    return (
        <>

            <div id="profile-container">

                <div id="profile-img">
                    <img src="images/Pixel Wizard with Flaming Staff.png" alt="profile image"></img>
                </div>
                <div id="profile-name">Abhigyan Dutta</div>

                <div id="profile-item-container">

                    <div className="profile-items">
                        STREAKS
                    </div>
                    <div className="profile-items">
                        TROPHIES
                    </div>
                    <div className="profile-items">
                        FRIENDS
                    </div>
                    <div className="profile-items">
                        PROJECTS
                    </div>
                </div>
            </div>

            <div id="luro-section">
                <div id="luro-header">
                    <span id="luro-title">LUROS</span>
                    <div id="luro-counter">3</div>
                </div>

                <div id="luro-grid">
                    <div className="luros">1</div>
                    <div className="luros">2</div>
                    <div className="luros">3</div>
                    <div className="luros">4</div>
                    <div className="luros">5</div>
                    <div className="luros">6</div>
                </div>
            </div>
        </>
    )
}