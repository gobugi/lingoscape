from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length


class DeckForm(FlaskForm):
    title = StringField(
        'title', validators=[DataRequired("Title input required"), Length(-1, 50, "Max length for title is 50 characters")])
    languageId = IntegerField(
        'languageId', validators=[DataRequired("Must select a language")])
    authorId = IntegerField(
        'authorId', validators=[DataRequired()])
