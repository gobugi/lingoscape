from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import createCardForm


card_routes = Blueprint('cards', __name__)


@card_routes.route('/')
def cards():
    cards = Card.query.all()
    return {'cards': [card.to_dict() for card in cards]}


@card_routes.route('/decks/<int:id>/cards')
def deck_id_cards(deckId):
    deck_id_cards = Card.query.filter_by(deckId=deckId)
    return {'deck_id_cards': [card.to_dict() for card in deck_id_cards]}


@card_routes.route('', methods=['POST'])
@login_required
def create_card():
    cardForm = createCardForm()
    cardForm['csrf_token'].data = request.cookies['csrf_token']

    if cardForm.validate_on_submit():
        card = Card(deckId=cardForm.data['deckId'], question=cardForm.data['question'], answer=cardForm.data['answer'])

        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(cardForm.errors)}, 400
