import argparse
import sys
from werkzeug.security import generate_password_hash

# Import the factory, db and User model
from app import create_app
from extensions import db
from app.models import User

def main():
    parser = argparse.ArgumentParser(description="Add a new user to the database")
    parser.add_argument("--email", required=True, help="Email address of the new user")
    parser.add_argument("--password", required=True, help="Password for the new user")
    parser.add_argument("--name", required=True, help="Full name of the new user")
    parser.add_argument("--role", choices=["admin", "user"], default="user",
                        help="Role of the new user (default: user)")
    args = parser.parse_args()

    # Create and configure the Flask app
    app = create_app()
    with app.app_context():
        # Ensure tables exist
        db.create_all()

        # Check for existing email
        if User.query.filter_by(email=args.email).first():
            print(f"Error: A user with email '{args.email}' already exists.", file=sys.stderr)
            sys.exit(1)

        # Create the user
        user = User(
            email=args.email,
            password_hash=generate_password_hash(args.password),
            name=args.name,
            role=args.role
        )

        db.session.add(user)
        db.session.commit()
        print(f"Success: Created user id={user.id}, email={user.email}, role={user.role}")

if __name__ == "__main__":
    main()