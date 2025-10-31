function Footer() {
    return (
        <footer>
            <p>© {new Date().getFullYear()} SagePath. All rights reserved.</p>

            <div className="footer-links">
                <a href="aboutpage.html">About Us</a>
                <a href="contactpage.html">Contact</a>
                <a href="privacypolicy.html">Privacy Policy</a>
                <a href="termsofservice.html">Terms of Service</a>
            </div>

            <div className="social-media">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>

            <div id="courses-offered">
                <h4>Courses Offered</h4>
                <ul>
                    <li>Introduction to Programming</li>
                    <li>Web Development Basics</li>
                    <li>Data Science Fundamentals</li>
                    <li>Machine Learning 101</li>
                    <li>Advanced JavaScript</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
