from app.models import db, Deck


# Adds a demo user, you can add other users here if you want
def seed_decks():

    deck01 = Deck(languageId=21, authorId=1, title="Basic Korean Phrases" )
    deck02 = Deck(languageId=20, authorId=2, title="Japanese Greetings" )
    deck03 = Deck(languageId=32, authorId=3, title="Spanish 1 Greetings" )
    deck04 = Deck(languageId=5, authorId=1, title="Chinese 101" )
    deck05 = Deck(languageId=15, authorId=2, title="Greek Alphabet (capital letters)" )
    deck06 = Deck(languageId=28, authorId=3, title="Russian 101" )
    deck07 = Deck(languageId=12, authorId=1, title="FR 311 Vocabulaire 6 Quiz" )
    deck08 = Deck(languageId=1, authorId=2, title="Arabic Words - Beginner" )
    deck09 = Deck(languageId=33, authorId=3, title="Swedish 101" )





    db.session.add(deck01)
    db.session.add(deck02)
    db.session.add(deck03)
    db.session.add(deck04)
    db.session.add(deck05)
    db.session.add(deck06)
    db.session.add(deck07)
    db.session.add(deck08)
    db.session.add(deck09)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
