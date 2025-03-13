# 🏥 Hospital Management System Node and Express.JS Backend API

## 📑 Table of Contents
- [📌 Introduction](#introduction)
- [✨ Features](#features)
- [🛠️ Technologies Used](#technologies-used)
- [⚙️ Installation](#installation)
- [🔐 Environment Variables](#environment-variables)
- [🚀 Running the Application](#running-the-application)
- [📡 API Endpoints](#api-endpoints)
- [📁 Project Structure](#project-structure)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## 📌 Introduction
The **Hospital Management System** is a web application designed to manage the operations of a hospital. It allows administrators, doctors, nurses, and patients to interact with the system to manage appointments, profiles, and other related tasks.

## ✨ Features
- 🔑 **User Authentication**: Secure login and registration for users.
- 🔄 **Role-Based Access Control**: Different functionalities for admin, doctor, nurse, and patient roles.
- 🧑‍⚕️ **Profile Management**: Users can view and update their profiles.
- 📅 **Appointment Management**: Patients can book appointments, and doctors can manage their appointments.
- 💊 **Prescription Management**: Doctors can create and manage prescriptions for patients.
- 📊 **Admin Dashboard**: Admins can manage users, doctors, and nurses.

## 🛠️ Technologies Used
- ⚙️ **Backend**: 🟢 Node.js, 🚀 Express.js
- 🗄️ **Database**: 🟢 MongoDB
- 🔐 **Authentication**: JWT (JSON Web Tokens)
- 🛡️ **Middleware**: Helmet, Morgan, Cors, Body-Parser
- 📝 **Environment Variables**: dotenv

## ⚙️ Installation
1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/hospital-management-system.git
    cd hospital-management-system
    ```
2. **Install dependencies**:
    ```sh
    npm install
    ```

## 🔐 Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=3000
MONGODB=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
```

## 🚀 Running the Application
1. **Start the Server**
```sh
npm start
```
2. **Access the application:**
```sh
http://localhost:5000
```

## 📡 API Endpoints
### 🔑 Authentication
- **🆕 POST** `/api/auth/register` - Register a new user.
- **🔓 POST** `/api/auth/login` - Login a user.

### 👤 User
- **📋 GET** `/api/user/` - Get all users.
- **🔍 GET** `/api/user/:id` - Get a user by ID.
- **🙍‍♂️ GET** `/api/user/profile/me` - Get the authenticated user's profile.
- **✏️ PUT** `/api/user/profile` - Update the authenticated user's profile.
- **🗑️ DELETE** `/api/user/profile` - Delete the authenticated user's profile.

### 🏥 Admin
- **📋 GET** `/api/admin/profile` - Get the authenticated admin's profile.
- **✏️ PUT** `/api/admin/profile` - Update the authenticated admin's profile.
- **🗑️ DELETE** `/api/admin/profile` - Delete the authenticated admin's profile.
- **✅ PUT** `/api/admin/approve-doctor/:id` - Approve a doctor.
- **❌ PUT** `/api/admin/reject-doctor/:id` - Reject a doctor.
- **✅ PUT** `/api/admin/approve-nurse/:id` - Approve a nurse.
- **❌ PUT** `/api/admin/reject-nurse/:id` - Reject a nurse.

### 👨‍⚕️ Doctor
- **📋 GET** `/api/doctor/` - Get all doctors.
- **👨‍⚕️ GET** `/api/doctor/profile` - Get the authenticated doctor's profile.
- **✏️ PUT** `/api/doctor/profile` - Update the authenticated doctor's profile.
- **🗑️ DELETE** `/api/doctor/profile` - Delete the authenticated doctor's profile.
- **📅 GET** `/api/doctor/appointments` - Get all appointments for the authenticated doctor.
- **✅ PUT** `/api/doctor/appointments/:id/complete` - Mark an appointment as completed.
- **❌ PUT** `/api/doctor/appointments/:id/cancel` - Cancel an appointment.

### 👩‍⚕️ Nurse
- **📋 GET** `/api/nurse/` - Get all nurses.
- **👩‍⚕️ GET** `/api/nurse/profile` - Get the authenticated nurse's profile.
- **✏️ PUT** `/api/nurse/profile` - Update the authenticated nurse's profile.
- **🗑️ DELETE** `/api/nurse/profile` - Delete the authenticated nurse's profile.

### 📅 Appointment
- **📋 GET** `/api/appointment/my-appointments` - Get all appointments for the authenticated user.
- **🆕 POST** `/api/appointment` - Create a new appointment.
- **📋 GET** `/api/appointment/` - Get all appointments in the system.
- **🔍 GET** `/api/appointment/:id` - Get an appointment by ID.
- **✏️ PUT** `/api/appointment/:id` - Update an appointment.
- **🗑️ DELETE** `/api/appointment/:id` - Delete an appointment.
- **❌ PUT** `/api/appointment/:id/cancel` - Cancel an appointment.
- **✅ PUT** `/api/appointment/:id/complete` - Mark an appointment as completed.

### 💊 Prescription
- **📋 GET** `/api/prescription` - Get all prescriptions.
- **🔍 GET** `/api/prescription/:id` - Get a prescription by ID.
- **🆕 POST** `/api/prescription/create` - Create a new prescription.
- **✏️ PUT** `/api/prescription/:id` - Update a prescription.
- **🗑️ DELETE** `/api/prescription/:id` - Delete a prescription.

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes. 🚀

## 📜 License
This project is licensed under the `MIT` License.

👨‍💻 **Author:** Metasebiyaw Asfaw -> Software Engineer
