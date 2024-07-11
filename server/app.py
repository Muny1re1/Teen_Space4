# basic imports
from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime

from models import db, User, Club, Event, Announcement, user_club

#database and migrations intialisation
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://username:password@localhost/teen_space'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# Home page 
class Index(Resource):
    def get(self):
        response_dict = {"index": "Welcome to the Teen Space API"}
        response = make_response(response_dict, 200)
        return response

api.add_resource(Index, '/')

# Sign up
class Register(Resource):
    def post(self):
        data = request.get_json()
        new_user = User(username=data['username'], password_hash=data['password'], email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        response_dict = new_user.to_dict()
        response = make_response(response_dict, 201)
        return response

api.add_resource(Register, '/register')

# Sign in
class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if not user or user.password_hash != data['password']:
            return make_response({'message': 'Invalid credentials'}, 401)
        response_dict = {'message': 'Login successful'}
        response = make_response(response_dict, 200)
        return response

api.add_resource(Login, '/login')

# List of clubs
class Clubs(Resource):
    def get(self):
        clubs = Club.query.all()
        response_dict_list = [club.to_dict() for club in clubs]
        response = make_response(response_dict_list, 200)
        return response

# create a new club
    def post(self):
        data = request.get_json()
        new_club = Club(name=data['name'], description=data['description'])
        db.session.add(new_club)
        db.session.commit()
        response_dict = new_club.to_dict()
        response = make_response(response_dict, 201)
        return response

api.add_resource(Clubs, '/clubs')

# Find clubs by id ( club when clicked )
class ClubByID(Resource):
    def get(self, club_id):
        club = Club.query.filter_by(id=club_id).first()
        response_dict = club.to_dict()
        response = make_response(response_dict, 200)
        return response

api.add_resource(ClubByID, '/clubs/<int:club_id>')

# user joining a club
class JoinClub(Resource):
    def post(self, club_id):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return make_response({'message': 'User not found'}, 404)
        club = Club.query.get_or_404(club_id)
        user.clubs.append(club)
        db.session.commit()
        response_dict = {"message": "Joined club successfully"}
        response = make_response(response_dict, 200)
        return response

api.add_resource(JoinClub, '/clubs/<int:club_id>/join')


# user leaving a club
class LeaveClub(Resource):
    def post(self, club_id):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return make_response({'message': 'User not found'}, 404)
        club = Club.query.get_or_404(club_id)
        user.clubs.remove(club)
        db.session.commit()
        response_dict = {"message": "Left club successfully"}
        response = make_response(response_dict, 200)
        return response

api.add_resource(LeaveClub, '/clubs/<int:club_id>/leave')


# List of events
class Events(Resource):
    def get(self):
        events = Event.query.all()
        response_dict_list = [event.to_dict() for event in events]
        response = make_response(response_dict_list, 200)
        return response


# create a new event
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(username=data['username']).first()
        if not user:
            return make_response({'message': 'User not found'}, 404)
        new_event = Event(name=data['name'], date=datetime.strptime(data['date'], '%Y-%m-%d'), user_id=user.id, club_id=data['club_id'])
        db.session.add(new_event)
        db.session.commit()
        response_dict = new_event.to_dict()
        response = make_response(response_dict, 201)
        return response

api.add_resource(Events, '/events')

# create new announcements
# class Announcements(Resource):
#     def post(self):
#         data = request.get_json()
#         user = User.query.filter_by(username=data['username']).first()
#         if not user:
#             return make_response({'message': 'User not found'}, 404)
#         new_announcement = Announcement(content=data['content'], user_id=user.id)
#         db.session.add(new_announcement)
#         db.session.commit()
#         response_dict = new_announcement.to_dict()
#         response = make_response(response_dict, 201)
#         return response

# api.add_resource(Announcements, '/announcements')

if __name__ == '__main__':
    app.run(port=5555, debug=True)