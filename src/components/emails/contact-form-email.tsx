import React from 'react';

interface ContactFormEmailProps {
  firstName: string;
  familyName: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  firstName,
  familyName,
  email,
  message,
}: ContactFormEmailProps) => {
  const fullName = `${firstName} ${familyName}`;

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <h2
          style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}
        >
          New Contact Form Submission
        </h2>

        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px',
          }}
        >
          <div style={{ marginBottom: '15px' }}>
            <strong
              style={{ color: '#555', display: 'inline-block', width: '80px' }}
            >
              Name:
            </strong>
            <span style={{ color: '#333' }}>{fullName}</span>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong
              style={{ color: '#555', display: 'inline-block', width: '80px' }}
            >
              Email:
            </strong>
            <a
              href={`mailto:${email}`}
              style={{ color: '#0066cc', textDecoration: 'none' }}
            >
              {email}
            </a>
          </div>

          <div>
            <strong
              style={{ color: '#555', display: 'block', marginBottom: '8px' }}
            >
              Message:
            </strong>
            <div
              style={{
                backgroundColor: '#f8f9fa',
                padding: '15px',
                borderRadius: '4px',
                borderLeft: '4px solid #0066cc',
                lineHeight: '1.6',
              }}
            >
              {message.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < message.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          This message was sent from the contact form on your website.
        </div>
      </div>
    </div>
  );
};
