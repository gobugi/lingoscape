from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import createDeckForm, editDeckForm
from colors import *


deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/')
def decks():
    decks = Deck.query.all()
    return {'decks': [deck.to_dict() for deck in decks]}


@deck_routes.route('/<int:id>')
def single_deck(id):
    deck = Deck.query.filter_by(id=id).first()
    return {'deck': [deck.to_dict()]}


# @deck_routes.route('/edit/<int:id>')
# @login_required
# def deck_by_id_to_edit(id):
#     deck = Deck.query.get(id)
#     return deck.to_dict()



@deck_routes.route('/edit/<int:id>', methods=['PATCH'])
@login_required
def edit_deck(id):
    deck = Deck.query.get(id)
    deckForm = editDeckForm()
    deckForm['csrf_token'].data = request.cookies['csrf_token']
    print(CGREEN, "\n", deckForm.data, "\n", CEND)
    if deckForm.validate_on_submit():
        deck = Deck(title=deckForm.data['title'])
        db.session.commit()
        return {"deck": deck.to_dict()}
    else:
        return { 'errors': validation_errors_to_error_messages(deckForm.errors)}, 400




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
    deckForm = createDeckForm()
    deckForm['csrf_token'].data = request.cookies['csrf_token']

    print(CGREEN, "\n", deckForm.data, "\n", CEND)

    if deckForm.validate_on_submit():
        deck = Deck(title=deckForm.data['title'], authorId=deckForm.data['authorId'], languageId=deckForm.data['languageId'])

        db.session.add(deck)
        db.session.commit()
        return deck.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(deckForm.errors)}, 400
