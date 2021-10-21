from flask import Blueprint, jsonify, session, request
from app.models import Deck, User, Card, Language, db



language_routes = Blueprint('languages', __name__)


@language_routes.route('/')
def languages():
    languages = Language.query.all()
    return {'languages': [language.to_dict() for language in languages]}
