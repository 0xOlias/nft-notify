CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS notify;

CREATE TABLE IF NOT EXISTS notify.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    email TEXT,
    phone TEXT,
    wallet TEXT
);

CREATE TABLE IF NOT EXISTS notify.webhooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    alchemy_id INT,
    addresses TEXT[],
    is_active BOOLEAN,
    time_created TIMESTAMP,

    user_id UUID REFERENCES notify.users
);