# 🏥 MediConnect - Telemedicine Platform

> A cloud-native healthcare platform demonstrating the industrial application of cloud computing in telemedicine and patient management.



## 📋 Table of Contents

- [Overview]
- [Features]
- [Tech Stack]
- [Architecture]
- [Cloud Services]
- [API Documentation]
- [Installation]
- [Environment Variables]
- [Usage]
- [Testing]
- [Deployment]
- [Security]
- [Future Enhancements]
- [Contributing]




## 🎯 Overview

MediConnect is a cloud-based telemedicine platform built to demonstrate the practical implementation of cloud computing in healthcare. The project showcases modern cloud-native development practices, including:

- ✅ Platform-as-a-Service (PaaS) deployment
- ✅ Database-as-a-Service (DBaaS) integration
- ✅ RESTful API architecture
- ✅ Multi-cloud infrastructure
- ✅ Secure authentication with JWT
- ✅ CI/CD pipeline with GitHub Actions

Live Demo: https://mediconnect-api-48tc.onrender.com



## ✨ Features

### Core Features

- 🔐 User Authentication - Secure JWT-based registration and login
- 👤 Patient Management - Complete profile management with medical history
- 👨‍⚕️ Doctor Directory - Browse available doctors with specializations
- 📅 Appointment Booking - Schedule appointments with conflict prevention
- 📊 Appointment History - View and manage all appointments
- 🔒 Role-Based Access - Different permissions for patients, doctors, and admins
- 🌐 Cloud Deployment - Fully deployed on cloud infrastructure
- 📱 RESTful API - Well-documented endpoints for all operations

### Technical Features

- ⚡ Auto-scaling capabilities
- 🔄 Zero-downtime deployments
- 📈 Database connection pooling
- 🔐 SSL/TLS encryption
- 🛡️ SQL injection prevention
- 📝 Comprehensive error handling
- 🎯 Input validation
- 📊 Performance monitoring


## 🛠️ Tech Stack

### Backend
- Runtime: Node.js 20.x
- Framework: Express.js 4.18
- Language: JavaScript (ES6+)
- Authentication: JWT (jsonwebtoken)
- Password Security:** Bcrypt

### Database
- Database: PostgreSQL 15
- Driver: node-postgres (pg)
- ORM: Raw SQL queries (for learning purposes)

### Cloud Services
- Application Hosting: Render.com (PaaS)
- Database Hosting: Railway.app (DBaaS)
- Version Control: GitHub
- CI/CD: GitHub + Render integration

### Development Tools
- Code Editor: VS Code
- API Testing: Thunder Client / Postman
- Version Control: Git

---

## 🏗️ Architecture


┌─────────────────────────────────────────────────┐
│              Client Applications                │
│      (Web / Mobile / Third-party APIs)         │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTPS (TLS 1.3)
                    ▼
┌─────────────────────────────────────────────────┐
│            Render.com (PaaS)                    │
│  ┌───────────────────────────────────────┐     │
│  │      Node.js Application              │     │
│  │  ┌─────────────────────────────────┐  │     │
│  │  │  Express.js REST API            │  │     │
│  │  │  • Authentication Layer         │  │     │
│  │  │  • Business Logic               │  │     │
│  │  │  • Data Validation              │  │     │
│  │  └─────────────────────────────────┘  │     │
│  └───────────────┬───────────────────────┘     │
└──────────────────┼─────────────────────────────┘
                   │
                   │ PostgreSQL Protocol
                   │ (SSL Encrypted)
                   ▼
┌─────────────────────────────────────────────────┐
│          Railway.app (DBaaS)                    │
│  ┌───────────────────────────────────────┐     │
│  │    PostgreSQL Database                │     │
│  │    • Users & Authentication           │     │
│  │    • Patients Information             │     │
│  │    • Doctors Directory                │     │
│  │    • Appointments Records             │     │
│  │    • Automatic Backups                │     │
│  └───────────────────────────────────────┘     │
└─────────────────────────────────────────────────┘


## ☁️ Cloud Services

### Railway.app (Database)

Features Used:
- Managed PostgreSQL database
- Automatic daily backups
- SSL/TLS encryption
- Connection pooling
- 99.9% uptime SLA

Configuration:
- Database: PostgreSQL 15
- Region: US West
- Storage: SSD-based
- Free tier: 512 MB RAM, 1 GB storage

### Render.com (Application Hosting)

**Features Used:**
- Auto-deploy from GitHub
- Free SSL certificates
- Zero-downtime deployment
- Global CDN
- Environment variable management

**Configuration:**
- Runtime: Node.js 20.x
- Build: npm install
- Start: node src/server.js
- Free tier: 750 hours/month

---

## 📚 API Documentation

### Base URL

**Production:** `https://mediconnect-api.onrender.com`  
**Local:** `http://localhost:5000`

### Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Endpoints

#### Authentication Endpoints

##### Register User
http
POST /api/auth/register


Request Body:
json
{
  "email": "patient@example.com",
  "password": "SecurePassword123",
  "role": "patient",
  "fullName": "John Doe",
  "phone": "9876543210"
}


Response: `201 Created`
json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "role": "patient"
  }
}


##### Login
http
POST /api/auth/login


Request Body:
json
{
  "email": "patient@example.com",
  "password": "SecurePassword123"
}


Response: `200 OK`
json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "patient@example.com",
    "role": "patient"
  }
}


#### Patient Endpoints

##### Get Profile (Protected)
http
GET /api/patients/profile
Authorization: Bearer <token>


Response: `200 OK`
json
{
  "success": true,
  "profile": {
    "id": 1,
    "email": "patient@example.com",
    "role": "patient",
    "full_name": "John Doe",
    "date_of_birth": "1995-05-15",
    "gender": "Male",
    "blood_group": "O+",
    "phone": "9876543210",
    "address": "123 Main St, Bangalore",
    "emergency_contact": "9876543211"
  }
}


##### Update Profile (Protected)
http
PUT /api/patients/profile
Authorization: Bearer <token>


Request Body:
json
{
  "fullName": "John Doe Updated",
  "dateOfBirth": "1995-05-15",
  "gender": "Male",
  "bloodGroup": "O+",
  "phone": "9876543210",
  "address": "123 Main St, Bangalore, Karnataka",
  "emergencyContact": "9876543211"
}


Response: `200 OK`

##### Get Doctors List (Protected)
http
GET /api/patients/doctors
Authorization: Bearer <token>


Response: `200 OK`
json
{
  "success": true,
  "doctors": [
    {
      "id": 1,
      "full_name": "Dr. Sarah Johnson",
      "specialization": "Cardiologist",
      "qualification": "MBBS, MD (Cardiology)",
      "experience": 15,
      "consultation_fee": "500.00",
      "available_days": "Mon,Tue,Wed,Thu,Fri"
    }
  ]
}


#### Appointment Endpoints

##### Book Appointment (Protected)
http
POST /api/appointments/book
Authorization: Bearer <token>


Request Body:
json
{
  "doctorId": 1,
  "appointmentDate": "2025-10-20",
  "appointmentTime": "10:00:00",
  "symptoms": "Regular health checkup"
}


Response: `201 Created`

##### Get My Appointments (Protected)
http
GET /api/appointments
Authorization: Bearer <token>


Response: `200 OK`
json
{
  "success": true,
  "appointments": [
    {
      "id": 1,
      "appointment_date": "2025-10-20",
      "appointment_time": "10:00:00",
      "status": "scheduled",
      "symptoms": "Regular health checkup",
      "doctor_name": "Dr. Sarah Johnson",
      "specialization": "Cardiologist",
      "created_at": "2025-10-12T10:30:00Z"
    }
  ]
}


##### Cancel Appointment (Protected)
http
PUT /api/appointments/:id/cancel
Authorization: Bearer <token>


Response: `200 OK`

### Error Responses

All error responses follow this format:

json
{
  "success": false,
  "message": "Descriptive error message"
}

Common Status Codes:
- `400` - Bad Request (Invalid input)
- `401` - Unauthorized (Missing/invalid token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found (Resource doesn't exist)
- `500` - Internal Server Error

---

## 🚀 Installation

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 13.x or higher (or use Railway cloud database)
- Git
- npm or yarn

### Local Development Setup

1. Clone the repository

bash
git clone https://github.com/YOUR_USERNAME/mediconnect-backend.git
cd mediconnect-backend


2. Install dependencies

bash
npm install


3. Create `.env` file

bash
cp .env.example .env


Edit `.env` with your credentials (see Environment Variables section)

4. Setup Database

Option A: Use Railway cloud database (recommended)
- Create PostgreSQL on Railway.app
- Copy DATABASE_URL from Railway

Option B: Local PostgreSQL
bash
createdb mediconnect


5. Run database migrations

bash
node setup-db.js


6. Start development server

bash
npm run dev

Server will start on `http://localhost:5000`


## 🔐 Environment Variables

Create a `.env` file in the root directory:

env
# Database Configuration
DATABASE_URL=postgresql://user:password@host:port/database

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here_use_random_string

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# Optional: Email Service (if implementing)
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=noreply@mediconnect.com

Security Note: Never commit `.env` file to version control!



## 💻 Usage

### Running Locally

bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start


 Testing API

Use any API client:

Thunder Client (VS Code):
1. Install Thunder Client extension
2. Import collection (if provided)
3. Test endpoints

Postman:
1. Import Postman collection
2. Set environment variables
3. Test endpoints

cURL Examples:

bash
# Health check
curl https://mediconnect-api.onrender.com/health

# Register
curl -X POST https://mediconnect-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123",
    "role": "patient",
    "fullName": "Test User",
    "phone": "9876543210"
  }'

# Login
curl -X POST https://mediconnect-api.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123"
  }'


 🧪 Testing

 Manual Testing

All endpoints have been manually tested using Thunder Client.

Test Coverage:
- ✅ User registration with validation
- ✅ User login with credentials
- ✅ JWT token generation and verification
- ✅ Protected route access control
- ✅ Profile CRUD operations
- ✅ Doctor listing
- ✅ Appointment booking
- ✅ Double-booking prevention
- ✅ Appointment cancellation

 Performance Metrics

- Average API response time: < 100ms
- Database query time: < 50ms
- Authentication overhead: ~40ms (bcrypt)
- Concurrent users tested: 10



🚢 Deployment

Deploy to Render

1. Push code to GitHub

bash
git add .
git commit -m "Initial commit"
git push origin main


2. Create Render account
   - Go to render.com
   - Sign up with GitHub

3. Create Web Service
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Name: `mediconnect-api`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `node src/server.js`

4. Add Environment Variables
   - DATABASE_URL
   - JWT_SECRET
   - PORT (use 10000 for Render)
   - NODE_ENV=production

5. Deploy!
   - Render will automatically deploy
   - Get your public URL

 CI/CD Pipeline

Automatic deployment on every push to `main` branch:

1. Push code to GitHub
2. Render webhook triggered
3. Code pulled automatically
4. Dependencies installed
5. Application built
6. Tests run (if configured)
7. Deployed with zero downtime


 🔒 Security

 Authentication & Authorization

- Password Security: Bcrypt hashing with 10 salt rounds
- JWT Tokens: 256-bit signatures, 7-day expiration
- Authorization: Role-based access control (RBAC)
- Token Storage: Client-side only (not in database)

 Data Security

- Encryption in Transit:  HTTPS/TLS 1.3
- Encryption at Rest: Database-level encryption
- SQL Injection: Parameterized queries
- XSS Prevention: Input sanitization
- CORS: Configured for specific origins

 Best Practices Implemented

✅ Environment variables for secrets  
✅ No hardcoded credentials  
✅ .gitignore for sensitive files  
✅ Error messages don't expose system details  
✅ Input validation on all endpoints  
✅ Rate limiting (planned)  


 🔮 Future Enhancements

 Phase 1 (Short-term)
- [ ] React.js frontend application
- [ ] Real-time notifications (WebSocket)
- [ ] File upload for medical documents
- [ ] Email notifications (SendGrid)
- [ ] Doctor dashboard
- [ ] Prescription management

 Phase 2 (Medium-term)
- [ ] Video consultation (WebRTC)
- [ ] Payment gateway integration
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Multi-language support

Phase 3 (Long-term)
- [ ] AI-based symptom checker
- [ ] Integration with hospital systems (HL7/FHIR)
- [ ] Wearable device integration
- [ ] Telemedicine insurance claims
- [ ] ML-based appointment recommendations


 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Coding Guidelines:
- Follow existing code style
- Add comments for complex logic
- Update documentation
- Test your changes



👨‍💻 Author

Sowmya.k.c

- GitHub:https://github.com/Sowmya-kc
- LinkedIn: www.linkedin.com/in/sowmya-k-c
- Email: kvb0641@gmail.com

🙏 Acknowledgments

- Railway.app for database hosting
- Render.com for application hosting
- Node.js and Express.js communities
- PostgreSQL documentation
- All open-source contributors


Made with ❤️ for Cloud Computing Assignment

⭐ Star this repository if you found it helpful!