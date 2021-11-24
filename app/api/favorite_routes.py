from flask import Blueprint, jsonify, session, request
from app.models import Favorite, User, Deck, db
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import FavoriteForm


favorite_routes = Blueprint('favorites', __name__)


@favorite_routes.route('/')
def favorites():
    favorites = Favorite.query.all()
    return {'favorites': [favorite.to_dict() for favorite in favorites]}


@favorite_routes.route('', methods=['POST'])
def create_favorite():
    favoriteForm = FavoriteForm()
    favoriteForm['csrf_token'].data = request.cookies['csrf_token']

    if favoriteForm.validate_on_submit():
        favorite = Favorite(deckId=favoriteForm.data['deckId'], followerId=favoriteForm.data['followerId'])

        db.session.add(favorite)
        db.session.commit()
        return favorite.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(favoriteForm.errors)}, 400


@favorite_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorite.query.get(id)

    db.session.delete(favorite)
    db.session.commit()
    return {'message': ['Successfully Deleted']}
