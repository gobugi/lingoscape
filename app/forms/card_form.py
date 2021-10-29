from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length





class CardForm(FlaskForm):
    deckId = IntegerField(
        'deckId', validators=[DataRequired()])
    question = StringField(
        'question', validators=[DataRequired("Field input required"), Length(-1, 80, "Max length for flashcard is 80 characters")])
    answer = StringField(
        'answer', validators=[DataRequired("Field input required"), Length(-1, 80, "Max length for flashcard is 80 characters")])
