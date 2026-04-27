-- Genolink Physician Portal — Seed Data
-- Run AFTER schema.sql
-- Usage: mysql -u root -p genolink < seed.sql
--
-- Default admin credentials:
--   email:    admin@genolink.com
--   password: Admin@1234
-- CHANGE THE PASSWORD after first login.

USE genolink;

-- Admin user (password: Admin@1234 — bcrypt hash rounds=10)
INSERT INTO users (name, email, password_hash, role) VALUES
('Genolink Admin', 'admin@genolink.com', '$2a$10$O65HRJtmOfAcVMyHZimUPeO5rHemOmDC4aMaZpQLc0/j/yUC.PyG.', 'admin')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Sample test catalog entries
INSERT INTO test_catalog (name, description, category) VALUES
('Complete Blood Count (CBC)', 'Measures different components and features of blood', 'Hematology'),
('Basic Metabolic Panel', 'Checks blood sugar, calcium, kidney function', 'Chemistry'),
('Lipid Panel', 'Measures cholesterol and triglycerides', 'Chemistry'),
('BRCA1/BRCA2 Gene Test', 'Detects mutations in breast cancer genes', 'Oncogenomics'),
('HER2 Amplification', 'HER2 gene amplification by FISH or IHC', 'Oncogenomics'),
('BCR-ABL Quantitative PCR', 'Monitors response to CML therapy', 'Hematology/Oncology'),
('MSI/MMR Testing', 'Microsatellite instability for immunotherapy eligibility', 'Oncogenomics')
ON DUPLICATE KEY UPDATE name = VALUES(name);
