import os

class Config:
    """
    Base configuration with defaults.
    """
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DefaultConfig(Config):
    """
    Default config: uses SQLite and defines a test password.
    Note: SQLite itself doesn’t enforce passwords, but we expose it for consistency.
    """
    DB_PASSWORD = "testpassword"
    # You can switch to an SQLCipher URI if you really need password protection:
    # SQLALCHEMY_DATABASE_URI = "sqlite+pysqlcipher://:testpassword@/database.db"
    SQLALCHEMY_DATABASE_URI = "sqlite:///database.db"

config = DefaultConfig()