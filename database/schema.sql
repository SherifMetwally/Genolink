-- Genolink Physician Portal — Database Schema
-- Run this file against a MySQL 8.0+ server
-- Usage: mysql -u root -p genolink < schema.sql

CREATE DATABASE IF NOT EXISTS genolink CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE genolink;

-- -------------------------------------------------------
-- Users (doctors + admins share this table)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150)  NOT NULL,
  email         VARCHAR(255)  NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  role          ENUM('doctor','admin') NOT NULL DEFAULT 'doctor',
  is_active     TINYINT(1)    NOT NULL DEFAULT 1,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- Doctor profile (extends users for doctor-specific info)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS doctors (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id          INT UNSIGNED NOT NULL UNIQUE,
  license_number   VARCHAR(100),
  specialty        VARCHAR(150),
  phone            VARCHAR(30),
  CONSTRAINT fk_doctors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -------------------------------------------------------
-- Patients (each belongs to the doctor who created them)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS patients (
  id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  doctor_id       INT UNSIGNED NOT NULL,
  first_name      VARCHAR(100) NOT NULL,
  last_name       VARCHAR(100) NOT NULL,
  dob             DATE,
  gender          ENUM('male','female','other','prefer_not_to_say'),
  contact_email   VARCHAR(255),
  contact_phone   VARCHAR(30),
  notes           TEXT,
  created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_patients_doctor FOREIGN KEY (doctor_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- -------------------------------------------------------
-- Test catalog (managed by admin)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS test_catalog (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  category    VARCHAR(100),
  is_active   TINYINT(1)   NOT NULL DEFAULT 1,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------
-- Test requests (submitted by doctors)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS test_requests (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_id  INT UNSIGNED NOT NULL,
  doctor_id   INT UNSIGNED NOT NULL,
  test_id     INT UNSIGNED NOT NULL,
  status      ENUM('pending','processing','completed','cancelled') NOT NULL DEFAULT 'pending',
  notes       TEXT,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tr_patient FOREIGN KEY (patient_id) REFERENCES patients(id)   ON DELETE RESTRICT,
  CONSTRAINT fk_tr_doctor  FOREIGN KEY (doctor_id)  REFERENCES users(id)      ON DELETE RESTRICT,
  CONSTRAINT fk_tr_test    FOREIGN KEY (test_id)    REFERENCES test_catalog(id) ON DELETE RESTRICT
);

-- -------------------------------------------------------
-- Reports (PDF files uploaded by admin)
-- -------------------------------------------------------
CREATE TABLE IF NOT EXISTS reports (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  test_request_id  INT UNSIGNED NOT NULL UNIQUE,
  file_path        VARCHAR(500) NOT NULL,
  original_name    VARCHAR(255),
  uploaded_by      INT UNSIGNED NOT NULL,
  uploaded_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_report_request     FOREIGN KEY (test_request_id) REFERENCES test_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_report_uploaded_by FOREIGN KEY (uploaded_by)     REFERENCES users(id)          ON DELETE RESTRICT
);
