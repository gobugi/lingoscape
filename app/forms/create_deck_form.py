from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User




class createDeckForm(FlaskForm):
    languageId = IntegerField(
        'languageId', validators=[DataRequired()])
    authorId = IntegerField(
        'authorId', validators=[DataRequired()])
    title = StringField(
        'title', validators=[DataRequired()])
