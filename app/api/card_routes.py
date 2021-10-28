from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CardForm


card_routes = Blueprint('cards', __name__)


@card_routes.route('/')
def cards():
    cards = Card.query.order_by(Card.id.asc())
    return {'cards': [card.to_dict() for card in cards]}




@card_routes.route('/<int:id>')
def single_card(id):
    card = Card.query.filter_by(id=id).first()
    return {'card': [card.to_dict()]}


@card_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_card(id):
    form = CardForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        updatedCard = Card.query.get(id)
        updatedCard.question = form.data['question']
        updatedCard.answer = form.data['answer']
        updatedCard.deckId = form.data['deckId']

        db.session.commit()
        return updatedCard.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400



@card_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_card(id):
    card = Card.query.get(id)

    db.session.delete(card)
    db.session.commit()
    return {'message': ['Successfully Deleted']}





@card_routes.route('', methods=['POST'])
@login_required
def create_card():
    cardForm = CardForm()
    cardForm['csrf_token'].data = request.cookies['csrf_token']

    if cardForm.validate_on_submit():
        card = Card(deckId=cardForm.data['deckId'], question=cardForm.data['question'], answer=cardForm.data['answer'])

        db.session.add(card)
        db.session.commit()
        return card.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(cardForm.errors)}, 400
