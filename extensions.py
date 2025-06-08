from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flasgger import Swagger

# Initialize Flask extensions
db = SQLAlchemy()
migrate = Migrate()
swagger = Swagger()


