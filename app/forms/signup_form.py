from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.fields.simple import PasswordField
from wtforms.validators import DataRequired, InputRequired, Email, ValidationError, Length, EqualTo
from wtforms.fields.html5 import EmailField
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')



class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, Length(3, 40, "must be between 3-40 characters")])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = StringField('password', validators=[DataRequired(), Length(6, 36, "must be between 6-36 characters")])
    # password = StringField('password', validators=[DataRequired(), EqualTo('repeatPassword', 'Passwords must match')])
    # repeatPassword  = StringField('repeatPassword', validators=[DataRequired()])
