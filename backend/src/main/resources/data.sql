INSERT INTO role (id, name, created_at)
VALUES
    ('de9e9c92-a8b4-4c38-bd98-ccc1f0e3fcc1', 'ROLE_ADMIN', NOW()),
    ('d490df57-2bc9-43c6-8215-d8775758487d', 'ROLE_MANAGER', NOW()),
    ('5ac27f6b-ffd3-4779-98e1-9d53865cb172', 'ROLE_USER', NOW())
ON CONFLICT (id) DO NOTHING;


INSERT INTO users (id, account_locked, created_at, email, enabled, firstname, lastname, password, updated_at)
VALUES
    ('5e9cf932-c14e-4fcb-bcb1-9d60197b48df', false, NOW(), 'trnka.roman13@gmail.com', true, 'Roman', 'Trnka', '$2a$10$yCmRCqQ6yjF1cHk1Su9xX.17vqSKS9B/Wh.9yGjScj6BY7PwjZuIW', NULL),
    ('b06e6acc-4c70-4856-8313-312933ce05d0', false, NOW(), 'admin@task-tracker.com', true, 'Admin', 'Trnka', '$2a$10$yCmRCqQ6yjF1cHk1Su9xX.17vqSKS9B/Wh.9yGjScj6BY7PwjZuIW', NULL),
    ('fb3f9300-d19b-4007-b400-55d82fdde7e3', false, NOW(), 'manager@task-tracker.com', true, 'Manager', 'Trnka', '$2a$10$yCmRCqQ6yjF1cHk1Su9xX.17vqSKS9B/Wh.9yGjScj6BY7PwjZuIW', NULL),
    ('e209eaad-8a1d-406f-8394-d66b2f382e03', false, NOW(), 'user@task-tracker.com', true, 'User', 'Trnka', '$2a$10$yCmRCqQ6yjF1cHk1Su9xX.17vqSKS9B/Wh.9yGjScj6BY7PwjZuIW', NULL)
ON CONFLICT (id) DO NOTHING;


INSERT INTO users_roles (users_id, roles_id)
VALUES
    ('5e9cf932-c14e-4fcb-bcb1-9d60197b48df', 'de9e9c92-a8b4-4c38-bd98-ccc1f0e3fcc1'),
    ('b06e6acc-4c70-4856-8313-312933ce05d0', 'de9e9c92-a8b4-4c38-bd98-ccc1f0e3fcc1'),
    ('fb3f9300-d19b-4007-b400-55d82fdde7e3', 'd490df57-2bc9-43c6-8215-d8775758487d'),
    ('e209eaad-8a1d-406f-8394-d66b2f382e03', '5ac27f6b-ffd3-4779-98e1-9d53865cb172')
ON CONFLICT (users_id, roles_id) DO NOTHING;
