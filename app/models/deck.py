from .db import db

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(50), nullable=False)

    languageId = db.Column(db.Integer, db.ForeignKey('languages.id'), nullable=False)
    language = db.relationship('Language', back_populates='decks')

    authorId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    author = db.relationship('User', back_populates='decks')

    cards = db.relationship('Card', back_populates='deck',
                               cascade="all, delete")



    def to_dict(self):
        return {
            'id': self.id,
            'languageId': self.languageId,
            'authorId': self.authorId,
            'author': self.author.to_dict(),
            'title': self.title,
            'cards': [card.to_dict() for card in self.cards]
        }
