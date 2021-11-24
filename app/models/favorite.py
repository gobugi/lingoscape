from .db import db

class Favorite(db.Model):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)

    deckId = db.Column(db.Integer, db.ForeignKey('decks.id'), nullable=False)

    followerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def to_dict(self):
        return {
            'id': self.id,
            'deckId': self.deckId,
            'followerId': self.followerId,
        }
