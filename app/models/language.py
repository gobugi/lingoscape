from .db import db

class Language(db.Model):
    __tablename__ = 'languages'

    id = db.Column(db.Integer, primary_key=True)
    language = db.Column(db.String(50), nullable=False)
