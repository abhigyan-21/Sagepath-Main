
export default function CoursePage() {
    return (
        <>
            {/* progress bar */}
            <div id="progress-container">

                <button className="progress-control" aria-label="Previous">
                    &#8249;
                </button>

                <div id="progress-bar">

                    <div className="progress-item completed">
                        progress
                    </div>
                    <div className="progress-item completed">
                        progress
                    </div>
                    <div className="progress-item completed">
                        progress
                    </div>
                    <div className="progress-item current">
                        progress
                    </div>
                    <div className="progress-item">
                        progress
                    </div>

                </div>
                <button className="progress-control" aria-label="Next">
                    &#8250;
                </button>

            </div>

            {/* <!-- Course Content --> */}
            <div className="content-grid">

                {/* <!-- Left column (video + doubts panel) --> */}
                <div className="course-container">

                    <div id="course-video-panel">
                        <img id="video-gif" src="/hello-ji.gif" alt="Demo Video" ></img>
                    </div>

                    <div id="Doubts-panel">
                        <div id="doubt-mascot-imgcontainer">
                            <img id="doubt-mascot-img" src="/Pixel Wizard with Flaming Staff.png" alt="mascot"></img>
                        </div>
                        <div className="doubts-content">
                            <h2>Doubts Panel</h2>
                            <p>Have questions? Ask here!</p>
                            <form className="doubts-form" action="#" onsubmit="return false;">
                                <input type="text" placeholder="Type your question..."></input>
                                    <button type="submit">Ask</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* <!-- Right column (sidebar) --> */}
                <aside className="course-sidebar">

                    <div className="stats-card">
                        <div id="luro-img-container">
                            <img id="luro-img" src="/Pixel Art Otter Creature.png" alt="luro image"></img>
                        </div>
                        <div className="stats-info">
                            <h3>Otter</h3>
                            <p>Level 5</p>
                            <p>XP: 1500</p>
                        </div>
                    </div>

                    <div className="topics-list">
                        <i className="fas fa-chevron-up"></i>
                        <button className="topic-item">topic</button>
                        <button className="topic-item">topic</button>
                        <button className="topic-item">topic</button>
                        <button className="topic-item highlight">mini game</button>
                        <button className="topic-item">topic</button>
                        <button className="topic-item">topic</button>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </aside>
            </div>
          
        </>
    )
}