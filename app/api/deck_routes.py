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
