import React, { useState } from 'react';
import { Container, Form, Button, ProgressBar, Alert } from 'react-bootstrap';
import './App.css';

function App() {
  const [formData, setFormData] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [progress, setProgress] = useState(0);
  const [selectedForm, setSelectedForm] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  // Handle form field changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    calculateProgress();
  };

  // Calculate form progress based on completion of required fields
  const calculateProgress = () => {
    const totalRequired = formFields.filter(field => field.required).length;
    const filledFields = formFields.filter(field => field.required && formData[field.name]).length;
    setProgress((filledFields / totalRequired) * 100);
  };

  // Handle form selection
  const handleFormSelect = (e) => {
    setSelectedForm(e.target.value);
    fetchFormFields(e.target.value);
  };

  // Simulated API response for different forms
  const fetchFormFields = (formType) => {
    let fields;
    switch (formType) {
      case 'User Information':
        fields = [
          { name: 'firstName', label: 'First Name', type: 'text', required: true },
          { name: 'lastName', label: 'Last Name', type: 'text', required: true },
          { name: 'age', label: 'Age', type: 'number', required: false },
        ];
        break;
      case 'Address Information':
        fields = [
          { name: 'street', label: 'Street', type: 'text', required: true },
          { name: 'city', label: 'City', type: 'text', required: true },
          { name: 'state', label: 'State', type: 'dropdown', options: ['California', 'Texas', 'New York'], required: true },
          { name: 'zipCode', label: 'Zip Code', type: 'text', required: false },
        ];
        break;
      case 'Payment Information':
        fields = [
          { name: 'cardNumber', label: 'Card Number', type: 'text', required: true },
          { name: 'expiryDate', label: 'Expiry Date', type: 'date', required: true },
          { name: 'cvv', label: 'CVV', type: 'password', required: true },
          { name: 'cardholderName', label: 'Cardholder Name', type: 'text', required: true },
        ];
        break;
      default:
        fields = [];
    }
    setFormFields(fields);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
  };

  // Validate form fields
  const validateForm = () => {
    const errors = [];
    formFields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        errors.push(`${field.label} is required`);
      }
    });
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      setErrorMessages([]);
      alert("Form submitted successfully!");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Dynamic Form Implementation</h2>

      {/* Form Type Selection */}
      <Form.Group controlId="formType">
        <Form.Label>Select Form Type:</Form.Label>
        <Form.Control as="select" value={selectedForm} onChange={handleFormSelect}>
          <option value="">Select...</option>
          <option value="User Information">User Information</option>
          <option value="Address Information">Address Information</option>
          <option value="Payment Information">Payment Information</option>
        </Form.Control>
      </Form.Group>

      {/* Form Fields */}
      <Form onSubmit={handleSubmit}>
        {formFields.map((field, index) => (
          <Form.Group key={index} controlId={field.name}>
            <Form.Label>{field.label}</Form.Label>
            {field.type === 'dropdown' ? (
              <Form.Control as="select" name={field.name} onChange={handleChange}>
                <option value="">Select...</option>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </Form.Control>
            ) : (
              <Form.Control
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={handleChange}
              />
            )}
            {errorMessages.includes(`${field.label} is required`) && (
              <div style={{ color: 'red', fontSize: '12px' }}>This field is required.</div>
            )}
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">Submit</Button>
      </Form>

      {/* Progress Bar */}
      <div className="progress mt-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <Alert variant="danger" className="mt-3">
          {errorMessages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Alert>
      )}
    </Container>
  );
}

export default App;
