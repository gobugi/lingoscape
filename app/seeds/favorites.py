from app.models import db, Favorite



def seed_favorites():
    favorite01 = Favorite(deckId=1, followerId=1)
    favorite02 = Favorite(deckId=2, followerId=1)

    db.session.add(favorite01)
    db.session.add(favorite02)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_favorites():
    db.session.execute('TRUNCATE favorites RESTART IDENTITY CASCADE;')
    db.session.commit()
