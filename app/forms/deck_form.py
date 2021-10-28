from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length



# def select_language(form, field):
#     languageId = field.data
#     if not (languageId).is_integer():
#         raise ValidationError('Must select a language')

class DeckForm(FlaskForm):
    languageId = IntegerField(
        'languageId', validators=[DataRequired()])
    authorId = IntegerField(
        'authorId', validators=[DataRequired()])
    title = StringField(
        'title', validators=[DataRequired(), Length(-1, 50, "Max length for title is 50 characters")])
