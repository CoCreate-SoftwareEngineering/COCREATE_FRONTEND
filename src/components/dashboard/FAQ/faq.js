import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'; // Import Container, Row, Col from react-bootstrap
import './faq.css';

const Faq = () => {
    return (
        <section style={{ backgroundColor: '#2C4251', margin: '20px' }}>
        <div className='mainClass' > 
            <Container className="py-5" >
                <Row className="border-0">
                    <Col style={{ backgroundColor: '#2C4251'}}>
                        <h1 className="mb-4" >User Guide:</h1>

                    </Col>
                </Row>

                {/* Section 1 */}
                <Row className="border-0">
                    <Col >
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Registering Account</h3>
                                <p className="card-text">Wanting to set up your CoCreate account, just click the link below called register, enter a few details about yourself and you're ready to start creating and collaborating!</p>
                                <Link className='link-text' to='/register' style={{ color: 'white' }}>Register here</Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 2 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Logging in</h3>
                                <p className="card-text">Do you already have an account with us? Thanks for coming back, to sign into your account just click the login button.</p>
                                <Link className='link-text' to='/login' style={{ color: 'white' }}>Login here</Link>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 3 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Forgotten Password</h3>
                                <p className="card-text">Have you forgotten your password? Oops that's annoying but we can get it back and sorted for you.  Just enter your username in the form here and change it to something safe but easier to remember.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 4 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Navigating the Web App</h3>
                                <p className="card-text">Do you ever have trouble getting around apps with so many different paths to follow it can be hard to know where to start to find anything! We've designed our web app with our users in mind.  With icons and descriptive text you shouldn't have any bother getting around our web app.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 5 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Creating a Project</h3>
                                <p className="card-text">Creating a project has never been easier or CoCreate!  Our main goal is to make creating in a collaborative area as easy as possible. So you'll be brought to your own personalised dashboard page where you can start creating your own projects by yourself or with other people in your group.  Group projects also allow users to call each other via video or audio calling as we want to make it easy for user's to communicate where ever they are.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 6 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Adding Events</h3>
                                <p className="card-text">Want to add an event to the calendar! We know how busy life can get so we've made it easier than ever to add events to the calendar to keep track of important dates and deadlines.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 7 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">Sharing Files</h3>
                                <p className="card-text">File Sharing is really important to us at CoCreate!  We think it's important to share files so we can work with each other seamlessly.  So we've enabled the ability to share files with our members in your group.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Section 8 */}
                <Row className="border-0">
                    <Col>
                        <div className="card mb-4 border-0" style={{ backgroundColor: '#2C4251'}}>
                            <div className="card-body">
                                <h3 className="card-title">User Data</h3>
                                <p className="card-text">Want to add an event to the calendar! We know how busy life can get so we've made it easier than ever to add events to the calendar to keep track of important dates and deadlines.</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                
            </Container>
        </div>
        </section>
    );
};

export default Faq;