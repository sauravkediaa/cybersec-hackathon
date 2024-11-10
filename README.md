# Unauthorized Access Alert System

### Team BETA - Cyber Forensics 4 VIT (CF4(VIT)) Hackathon Project

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)

---

## Project Overview

This project was developed for the **Cyber Forensics 4 VIT (CF4(VIT)) Hackathon** hosted by ISPIDER. The primary focus of the hackathon was to develop solutions to detect unauthorized access, data breaches, and cybersecurity leaks. Our team, **Team BETA**, was assigned the task of building a technological solution to:

- Detect and track unauthorized devices accessing sensitive information.
- Implement OTP-based authentication to validate access attempts from unrecognized devices.
- Ensure that known devices can access the system without additional authentication.

---

## Features

- **Device Fingerprinting**: Identifies and tracks devices using browser information and user agents.
- **IP Address Tracking**: Monitors login attempts from different IP addresses to detect suspicious activity.
- **OTP-Based Authentication**: Triggers OTP verification for unrecognized devices, ensuring secure access.
- **Device Registration**: Allows users to register new devices after OTP verification for seamless future access.
- **Rate Limiting**: Prevents brute force attempts on OTP entries.

---

## Architecture

The solution consists of:

1. **Frontend**: Built using **React** to provide a user-friendly interface for login, OTP verification, and device registration.
2. **Backend**: Deployed on **Cloudflare Workers**, handling authentication, device tracking, and OTP generation.
3. **Email Service**: Uses **SendGrid** for sending OTPs securely to users' email addresses.

---

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Cloudflare Workers, JavaScript
- **Database**: In-memory storage (for Proof of Concept)
- **Email Service**: SendGrid API
- **Version Control**: Git, GitHub

---

## Installation

### Prerequisites

- Node.js & npm installed on your system.
- Cloudflare account with `wrangler` CLI installed.
- SendGrid API key for email service.

### Backend Setup (Cloudflare Workers)

```bash
# Clone the repository
git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend

# Install dependencies
npm install

# Update wrangler.toml with your Cloudflare account details and SendGrid API key
wrangler publish
```

### Frontend Setup (React)

```bash
cd ../frontend

# Install dependencies
npm install

# Create a .env file in the frontend directory
echo "REACT_APP_API_BASE_URL=https://your-worker-subdomain.workers.dev" > .env

# Run the frontend application locally
npm start
```

---

## Usage

### Accessing the Application

1. Open the frontend at `http://localhost:3000`.
2. Enter your **email** and **password**.
3. If the device is recognized, access will be granted directly.
4. If the device is unrecognized, an OTP will be sent to your registered email.
5. Enter the OTP to gain access and choose to register the device if it's trusted.

---

## Endpoints

### Backend API Endpoints

| Method | Endpoint           | Description                                        |
| ------ | ------------------ | -------------------------------------------------- |
| POST   | `/login`           | Authenticates user and checks device authorization |
| POST   | `/generate-otp`    | Generates and sends OTP for unrecognized devices   |
| POST   | `/validate-otp`    | Validates OTP entered by the user                  |
| POST   | `/register-device` | Registers a new device after successful OTP        |

### Sample Request Payloads

- **Login**:
  ```json
  {
    "email": "rahul@xyz.com",
    "password": "password123",
    "deviceFingerprint": "device123"
  }
  ```
- **Generate OTP**:
  ```json
  {
    "email": "rahul@xyz.com",
    "deviceFingerprint": "device123"
  }
  ```
- **Validate OTP**:

  ```json
  {
    "email": "rahul@xyz.com",
    "otp": "123456"
  }
  ```

- **Register Device**:
  ```json
  {
    "email": "rahul@xyz.com",
    "deviceFingerprint": "device123"
  }
  ```

---

## Future Improvements

- **Biometric Authentication**: Adding fingerprint or facial recognition for additional security.
- **Persistent Storage**: Move from in-memory storage to a database (e.g., PostgreSQL) for scalability.
- **Multi-Factor Authentication (MFA)**: Add additional layers of authentication for enhanced security.
- **Comprehensive Logging**: Implement logging and alerting systems for suspicious activities.

---

## Contributors

- **Saurav Kediaa** (Team Leader)
- **Aviral Kapoor**
- **Sai Shravan**
- **Rahul C V**
- **Arushi Girdhar**

**Faculty Guide**: Dr. Anbarasa Kumar

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Thanks to **ISPIDER** for organizing the **CF4(VIT) Hackathon**.
- Special thanks to our faculty guide for the support and guidance throughout the project.
