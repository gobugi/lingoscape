from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import DeckForm
from colors import *


deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/')
def decks():
    decks = Deck.query.order_by(Deck.id.desc())
    return {'decks': [deck.to_dict() for deck in decks]}


# @deck_routes.route('/my_decks')
# # @login_required
# def get_decks():
#     user_id = current_user.id
#     user_decks = Deck.query.filter(Deck.user_id == user_id)
#     return {deck.id(): deck.to_dict() for deck in user_decks}


@deck_routes.route('/<int:id>')
def single_deck(id):
    deck = Deck.query.filter_by(id=id).first()
    return {'deck': [deck.to_dict()]}


@deck_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def edit_deck(id):
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        updatedDeck = Deck.query.get(id)
        updatedDeck.title = form.data['title']
        updatedDeck.authorId = form.data['authorId']
        updatedDeck.languageId = form.data['languageId']

        db.session.commit()
        return updatedDeck.to_dict()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors)}, 400




@deck_routes.route('/delete/<int:id>', methods=['DELETE'])
@login_required
def delete_deck(id):
    deck = Deck.query.get(id)
    if deck.authorId != current_user.to_dict()['id'] or not deck:
        return {'errors': ['No authorization.']}, 401

    db.session.delete(deck)
    db.session.commit()
    return {'message': ['Successfully Deleted']}


@deck_routes.route('', methods=['POST'])
@login_required
def create_deck():
    form = DeckForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(CGREEN, "\n", form.data, "\n", CEND)

    if form.validate_on_submit():
        deck = Deck(title=form.data['title'], authorId=form.data['authorId'], languageId=form.data['languageId'])

        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
