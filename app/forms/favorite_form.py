from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError, Length





class FavoriteForm(FlaskForm):
    deckId = IntegerField(
        'deckId', validators=[DataRequired()])
    followerId = IntegerField(
        'followerId', validators=[DataRequired()])
