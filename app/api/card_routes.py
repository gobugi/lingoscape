from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import createDeckForm
from  sqlalchemy.sql.expression import func


card_routes = Blueprint('cards', __name__)


@card_routes.route('/')
def cards():
    cards = Card.query.all()
    return {'cards': [card.to_dict() for card in cards]}

# @card_routes.route('', methods=['POST'])
# @login_required
# def create_card():
#     deckForm = createDeckForm()
#     deckForm['csrf_token'].data = request.cookies['csrf_token']
