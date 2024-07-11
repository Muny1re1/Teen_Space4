from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

user_club = db.Table(
    'user_club',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('club_id', db.Integer, db.ForeignKey('club.id'), primary_key=True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)


    # many-to-many relationship
    clubs = db.relationship("Club", secondary=user_club, back_populates="users", cascade="all, delete")

    # one-to-many relationships
    events = db.relationship("Event", back_populates="user", cascade="all, delete")
    announcements = db.relationship("Announcement", back_populates="user", cascade="all, delete")

    def __repr__(self):
        return f'<User {self.username}>'

class Club(db.Model, SerializerMixin):
    __tablename__ = "club"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)

    # many-to-many relationship
    users = db.relationship("User", secondary=user_club, back_populates="clubs", cascade="all, delete")

    # one-to-many relationship
    events = db.relationship("Event", back_populates="club", cascade="all, delete")

    def __repr__(self):
        return f'<Club {self.name}>'

class Event(db.Model, SerializerMixin):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    date = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'))

    # one-to-many relationships
    user = db.relationship("User", back_populates="events")
    club = db.relationship("Club", back_populates="events")

    def __repr__(self):
        return f'<Event {self.name}, {self.date}>'

class Announcement(db.Model, SerializerMixin):
    __tablename__ = "announcement"
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # one-to-many relationship
    user = db.relationship("User", back_populates="announcements")
