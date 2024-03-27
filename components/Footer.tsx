import '@/styles/Footer.scss'

function Footer() {

    const date = new Date;
    const year = date.getFullYear();

  return (
    <footer className='footer-section'>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-sm-12 d-flex flex-column align-items-center mb-3">
                    <h4>AskVault</h4>
                    <p>contact@askvault.com</p>
                    <h6>Follow Us</h6>
                    <div className='d-flex alig-items-center mt-3'>
                        <i className="bi bi-facebook"></i>
                        <i className="bi bi-twitter"></i>
                        <i className="bi bi-linkedin"></i>
                        <i className="bi bi-skype"></i>
                    </div>

                    
                </div>
                <div className='col-lg-8 col-sm-12'>
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 mb-3">
                            <h4>About Us</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#'>Support Center</a>
                                </li>
                                <li>
                                    <a href='#'>Customer Support</a>
                                </li>
                                <li>
                                    <a href='#'>About Us</a>
                                </li>
                                <li>
                                    <a href='#'>Copyright</a>
                                </li>
                                <li>
                                    <a href='#'>Popular Campaign</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-3">
                            <h4>Our Info</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#'>Return Policy</a>
                                </li>
                                <li>
                                    <a href='#'>Privacy Policy</a>
                                </li>
                                <li>
                                    <a href='/terms'>Terms & Conditions</a>
                                </li>
                                <li>
                                    <a href='#'> Site Map</a>
                                </li>
                                <li>
                                    <a href='#'>Store Hours</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-3">
                            <h4>My Account</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#'>Press Inquiries</a>
                                </li>
                                <li>
                                    <a href='#'>Social Media Directories</a>
                                </li>
                                <li>
                                    <a href='#'>Images & B-roll</a>
                                </li>
                                <li>
                                    <a href='#'> Permissions</a>
                                </li>
                                <li>
                                    <a href='#'> Speaker Requests</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-3">
                            <h4>Policy</h4>
                            <ul className='list-unstyled'>
                                <li>
                                    <a href='#'>Application Security</a>
                                </li>
                                <li>
                                    <a href='#'>Software Principles</a>
                                </li>
                                <li>
                                    <a href='#'>Unwanted Software Policy</a>
                                </li>
                                <li>
                                    <a href='#'>Responsible Supply Chain</a>
                                </li>
                                <li>
                                    <a href='#'></a>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
            <div className="row">
                <p className='text-center mt-3'>{year} © AskVault</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer