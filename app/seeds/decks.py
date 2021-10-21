from app.models import db, Deck


# Adds a demo user, you can add other users here if you want
def seed_decks():
    deck01 = Deck(languageId=12, authorId=1, title="French Greetings" )
    deck02 = Deck(languageId=32, authorId=1, title="Spanish Greetings" )
    deck03 = Deck(languageId=20, authorId=2, title="Japanese Greetings" )


    db.session.add(deck01)
    db.session.add(deck02)
    db.session.add(deck03)



    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
