export default function CommunityPage() {
    return (
        <>
            {/* <!-- Filter Buttons --> */}
            <div class="filter-bar">
                <button class="filter-btn active">
                    Projects <i class="fas fa-chevron-down"></i>
                </button>
                <button class="filter-btn">
                    Posts <i class="fas fa-chevron-down"></i>
                </button>
            </div>

            {/* <!-- Content Cards --> */}
            <div class="card">
                <div class="card-img"></div>
                <div class="card-text">
                    <h3>Project Title</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet.</p>
                </div>
            </div>

            <div class="card">
                <div class="card-img"></div>
                <div class="card-text">
                    <h3>Another Project</h3>
                    <p>Aliquam erat volutpat. Vivamus sagittis, felis sit amet bibendum fermentum.</p>
                </div>
            </div>
        </>
    )
}