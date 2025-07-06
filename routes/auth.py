from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from utils.auth_helper import encode_auth_token
import json
import os

auth_bp = Blueprint('auth', __name__)
USERS_FILE = 'data/users.json'

# Ensure the directory and file exist
def ensure_user_file():
    os.makedirs(os.path.dirname(USERS_FILE), exist_ok=True)
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, 'w') as f:
            json.dump({}, f)

# Load users from file
def load_users():
    ensure_user_file()
    with open(USERS_FILE, 'r') as f:
        return json.load(f)

# Save users to file
def save_users(users):
    ensure_user_file()
    with open(USERS_FILE, 'w') as f:
        json.dump(users, f, indent=4)

# Signup route
@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Support both camelCase and snake_case
    first_name = data.get('firstName') or data.get('first_name') or ''
    last_name = data.get('lastName') or data.get('last_name') or ''

    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400

    users = load_users()
    if email in users:
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    users[email] = {
        'password': hashed_password,
        'firstName': first_name,
        'lastName': last_name
    }

    save_users(users)
    return jsonify({'message': 'User created successfully'}), 201

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400

    users = load_users()
    user = users.get(email)
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = encode_auth_token(email)
    return jsonify({'token': token}), 200



    


   
        
    

  
