from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError





class createCardForm(FlaskForm):
    deckId = IntegerField(
        'deckId', validators=[DataRequired()])
    question = StringField(
        'question', validators=[DataRequired()])
    answer = StringField(
        'answer', validators=[DataRequired()])
