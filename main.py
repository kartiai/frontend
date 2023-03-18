##generate a flask application instance

from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

app = Flask(__name__)

# Change this to your secret key (can be anything, it's for extra protection)
app.secret_key = 'your secret key'

# Enter your database connection details below
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'kartiai'

# Intialize MySQL
mysql = MySQL(app)

# http://localhost:5000/pythonlogin/ - the following will be our login page, which will use both GET and POST requests
@app.route('/login.html', methods=['GET', 'POST'])
def login():
    print("hi")
    # Output message if something goes wrong...
    msg = ''
    # Check if "username" and "password" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        print("hi2")
        # Create variables for easy access
        username = request.form['username']
        password = request.form['password']

        # Check if account exists using MySQL
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM kartiai.users WHERE email = %s AND password = %s', (username, password,))
        # Fetch one record and return result
        account = cursor.fetchone()

        # If account exists in accounts table in out database
        if account:
            print("hi3")
            # Create session data, we can access this data in other routes
            session['loggedin'] = True
            session['id'] = account['id_user']
            session['username'] = account['email']
            # Redirect to home page
            print("Ana are mere")
            return 'Logged in successfully!'
        else:
            # Account doesnt exist or username/password incorrect
            print("Ana are mere2")
            msg = 'Incorrect username/password!'

    return render_template('login.html', msg=msg)

# http://localhost:5000/logout - this will be the logout page
@app.route('/logout')
def logout():
    # Remove session data, this will log the user out
   session.pop('loggedin', None)
   session.pop('id', None)
   session.pop('username', None)
   # Redirect to login page
   return redirect(url_for('login'))


@app.route('/')
def index():
    return render_template('index.html')



# @app.route('/login.html')
# def login():
#     return render_template('login.html')


@app.route('/register.html', methods=['GET', 'POST'])
def register():
    # Output message if something goes wrong...
    msg = ''
    print("hi1")
    # Check if "username", "password" and "email" POST requests exist (user submitted form)
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form :
        # Create variables for easy access
        print("hi2")
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM kartiai.users WHERE email = %s', (username,))
        account = cursor.fetchone()
        # If account exists show error and validation checks
        if account:
            msg = 'Account already exists!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', username):
            msg = 'Invalid email address!'
        elif not username or not password or not username:
            msg = 'Please fill out the form!'
        else:
            # Account doesnt exists and the form data is valid, now insert new account into accounts table
            cursor.execute('INSERT INTO kartiai.users VALUES (NULL, %s, %s)', (username, password,))
            mysql.connection.commit()
            print("hi3")
            msg = 'You have successfully registered!'
    elif request.method == 'POST':
        print("hi4")
        # Form is empty... (no POST data)
        msg = 'Please fill out the form!'
    # Show registration form with message (if any)
    return render_template('register.html', msg=msg)


@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/add/product')
def add_product():  
    data = request.get_json()
    products = data['products']
    print("products", products)
    return "ok"


if __name__ == '__main__':
    app.run()