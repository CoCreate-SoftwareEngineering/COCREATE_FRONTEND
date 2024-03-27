import React from 'react';
import { Link } from 'react-router-dom';
import './faq.css';

const Faq = () => {
  return (
    <section className="faq-section">
      <div className='faq-main'>
        <div className="faq-container">
          <div className="faq-header">
          <Link to="/dashboard" className="btn btn-primary">FAQ</Link>
            <h1>User Guide:</h1>
          </div>

          {/* Each faq-item represents a section */}
          <div className="faq-item">
            <h3>Registering Account</h3>
            <p>Wanting to set up your CoCreate account, just click the link below called register, enter a few details about yourself and you're ready to start creating and collaborating!</p>
            <Link className='faq-link' to='/register'>Register here</Link>
          </div>

          <div className="faq-item">
            <h3>Logging in</h3>
            <p>Do you already have an account with us? Thanks for coming back, to sign into your account just click the login button.</p>
            <Link className='faq-link' to='/login'>Login here</Link>
          </div>

          <div className="faq-item">
            <h3>Forgotten Password</h3>
            <p>Have you forgotten your password? Oops that's annoying but we can get it back and sorted for you. Just enter your username in the form here and change it to something safe but easier to remember.</p>
          </div>

          <div className="faq-item">
            <h3>Navigating the Web App</h3>
            <p>Do you ever have trouble getting around apps with so many different paths to follow it can be hard to know where to start to find anything! We've designed our web app with our users in mind. With icons and descriptive text you shouldn't have any bother getting around our web app.</p>
          </div>

          <div className="faq-item">
            <h3>Creating a Project</h3>
            <p>Creating a project has never been easier or CoCreate! Our main goal is to make creating in a collaborative area as easy as possible. So you'll be brought to your own personalised dashboard page where you can start creating your own projects by yourself or with other people in your group. Group projects also allow users to call each other via video or audio calling as we want to make it easy for user's to communicate where ever they are.</p>
          </div>

          <div className="faq-item">
            <h3>Adding Events</h3>
            <p>Want to add an event to the calendar! We know how busy life can get so we've made it easier than ever to add events to the calendar to keep track of important dates and deadlines.</p>
          </div>

          <div className="faq-item">
            <h3>Sharing Files</h3>
            <p>File Sharing is really important to us at CoCreate! We think it's important to share files so we can work with each other seamlessly. So we've enabled the ability to share files with our members in your group.</p>
          </div>

          <div className="faq-item">
            <h3>User Data</h3>
            <p>In order to comply with GDPR regulations, all user data that we store is displayed on the users profile page</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
