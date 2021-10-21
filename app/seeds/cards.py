from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    card01 = Card(deckId=1, question="Hello", answer="Bonjour" )
    card02 = Card(deckId=1, question="How are you?", answer="Comment allez-vous?" )
    card03 = Card(deckId=1, question="Goodbye", answer="Au revoir" )

    card04 = Card(deckId=2, question="Hello", answer="Hola" )
    card05 = Card(deckId=2, question="How are you?", answer="¿Cómo está usted?" )
    card06 = Card(deckId=2, question="Goodbye", answer="Adiós" )

    card07 = Card(deckId=3, question="Hello", answer="こんにちは" )
    card08 = Card(deckId=3, question="How are you?", answer="お元気ですか。" )
    card09 = Card(deckId=3, question="Goodbye", answer="さよなら" )



    db.session.add(card01)
    db.session.add(card02)
    db.session.add(card03)

    db.session.add(card04)
    db.session.add(card05)
    db.session.add(card06)

    db.session.add(card07)
    db.session.add(card08)
    db.session.add(card09)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
