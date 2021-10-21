from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import createDeckForm
from  sqlalchemy.sql.expression import func


deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/')
def decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}

@deck_routes.route('', methods=['POST'])
@login_required
def create_deck():
    deckForm = createDeckForm()
    deckForm['csrf_token'].data = request.cookies['csrf_token']

    # if deckForm.validate_on_submit():

    #     db.session.add(Deck(title=deckForm.data['title'], authorId=deckForm.data['authorId'], languageId=deckForm.data['languageId']))

    #     db.session.commit()
    #     return deck.to_dict()
    # else:
    #     return {'errors': validation_errors_to_error_messages(deckForm.errors)}, 400

    if deckForm.validate_on_submit():
        deck = Deck(title=deckForm.data['title'], authorId=deckForm.data['authorId'], languageId=deckForm.data['languageId'])

        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(deckForm.errors)}, 400