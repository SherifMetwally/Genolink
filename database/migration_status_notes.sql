-- Add status change notes (run on existing Hostinger DB)
-- Usage: select your DB in phpMyAdmin, then import/run this file

USE u757955434_genolink;

CREATE TABLE IF NOT EXISTS status_notes (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  test_request_id  INT UNSIGNED NOT NULL,
  status           ENUM('pending','processing','completed','cancelled') NOT NULL,
  note             TEXT NULL,
  created_by       INT UNSIGNED NOT NULL,
  created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sn_request FOREIGN KEY (test_request_id) REFERENCES test_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_sn_user    FOREIGN KEY (created_by)      REFERENCES users(id)         ON DELETE RESTRICT,
  INDEX idx_sn_request (test_request_id),
  INDEX idx_sn_created (created_at)
);
