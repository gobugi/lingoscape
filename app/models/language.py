from .db import db

class Language(db.Model):
    __tablename__ = 'languages'

    id = db.Column(db.Integer, primary_key=True)

    language = db.Column(db.String(50), nullable=False)

    decks = db.relationship('Deck', back_populates='language',
                               cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'language': self.language,
            'decks': [deck.to_dict() for deck in self.decks]
        }
