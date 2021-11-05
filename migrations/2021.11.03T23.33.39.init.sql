CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS notify;

CREATE TABLE IF NOT EXISTS notify.alchemy_webhooks (
    id INT PRIMARY KEY,
    app_id TEXT,
    network INT,
    webhook_type INT,
    webhook_url TEXT,
    is_active BOOLEAN,
    time_created BIGINT,
    addresses TEXT[]
);

CREATE TABLE IF NOT EXISTS notify.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    email TEXT,
    phone TEXT,
    wallet TEXT,
    webhook_id INT REFERENCES notify.alchemy_webhooks
);