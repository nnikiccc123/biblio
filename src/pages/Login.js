import React, { useState } from 'react';

function LoginForm() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const switchToLoginForm = () => {
    setLoginFormVisible(true);
  };

  const switchToRegisterForm = () => {
    setLoginFormVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const saveFormData = () => {
    const emptyFields = Object.values(formData).some((value) => value === '');
    const agreedToTerms = document.querySelector('.check-box').checked;
  
    if (emptyFields) {
      alert('Some field is empty. Please fill in all fields.');
    } else if (!agreedToTerms) {
      alert('Please agree to the terms and conditions.');
    } else {
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Your data has been saved in localStorage!');
    }
  };
  
  

  const loginUser = () => {
    
    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) {
      if (
        storedFormData.email === formData.email &&
        storedFormData.password === formData.password
      ) {
        alert('Welcome to the world of books');
      } else {
        alert('Incorrect email or password');
      }
    } else {
      alert('No registered users');
    }
  };

  return (
    
    <section className="login-section" id="login">
      <div className="paragraph-container">
       
        <div className="form-box">
          <div className="button-box">
            <div id="btn"></div>
            <button
              type="button"
              className="toggle-btn login"
              onClick={switchToLoginForm}
            >
              Log in
            </button>
            <button
              type="button"
              className="toggle-btn register"
              onClick={switchToRegisterForm}
            >
              Register
            </button>
          </div>

          {isLoginFormVisible ? (
            <form
              id="login-form"
              className="input-group-login"
              onSubmit={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              <input
                type="text"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button type="submit" className="submit-btn">
                Log in
              </button>
            </form>
          ) : (
            <form
              id="register-form"
              className="input-group-register"
              onSubmit={(e) => {
                e.preventDefault();
                saveFormData();
              }}
            >
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Id"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <input type="checkbox" className="check-box" />
              <span>I agree to the terms and conditions</span>
              <p></p>
              <button type="submit" className="submit-btn">
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
