from flask import Flask, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user, login_user
from forms import SignUpForm, LoginForm
from models import db, User

app = Flask(__name__)
app.config['SECRET_KEY'] = 'UOluYowZf9UO50q_h5AjIg'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db.init_app(app)

login_manager = LoginManager(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.context_processor
def inject_user():
    return {'current_user': current_user}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.password == form.password.data:
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            return "Invalid username or password"
    return render_template('login.html', form=form)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = SignUpForm()
    if form.validate_on_submit():
        user = User(username=form.username.data, email=form.email.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/journal')
@login_required
def journal():
    return render_template('journal.html')

@app.route('/checkin')
@login_required
def checkin():
    return render_template('checkin.html')

@app.route('/streaks')
@login_required
def streaks():
    return render_template('streaks.html')

@app.route('/quotes')
@login_required
def quotes():
    return render_template('quotes.html')

@app.route('/challenges')
@login_required
def challenges():
    return render_template('challenges.html')

@app.route('/help')
@login_required
def help():
    return render_template('help.html')

@app.route('/settings')
@login_required
def settings():
    return render_template('settings.html')

@app.route('/logout')
@login_required
def logout():
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
