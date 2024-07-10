from datetime import datetime, timedelta
from app import app, db  
from models import User, Club, Event, Announcement
import random

# Function to create users
def create_users(num_users):
    users = []
    for i in range(1, num_users + 1):
        user = User(username=f'user{i}', password=f'password{i}')
        users.append(user)
    return users

# Function to create clubs
def create_clubs(num_clubs):
    clubs = []
    for i in range(1, num_clubs + 1):
        club = Club(name=f'Club{i}', description=f'This is Club{i}')
        clubs.append(club)
    return clubs

# Function to create events
def create_events(users, clubs, min_events_per_club):
    events = []
    current_time = datetime.now()
    for club in clubs:
        num_events = random.randint(min_events_per_club, min_events_per_club + 2)
        for i in range(1, num_events + 1):
            event_time = current_time + timedelta(days=i)
            event = Event(
                name=f'Event{club.id}_{i}',
                date=event_time,
                user_id=random.choice(users).id,
                club_id=club.id
            )
            events.append(event)
    return events

# Function to create announcements
def create_announcements(users):
    announcements = []
    for user in users:
        announcement = Announcement(content=f'Announcement from {user.username}', user_id=user.id)
        announcements.append(announcement)
    return announcements

# Function to seed the data
def seed_data(num_users, num_clubs, min_events_per_club):
    with app.app_context():  # Ensure the app context is available
        db.drop_all()  # Drop all tables (be careful with this in a production environment)
        db.create_all()  # Create all tables

        # Create and add users to the session
        users = create_users(num_users)
        db.session.add_all(users)
        db.session.commit()  # Commit to generate user IDs

        # Create and add clubs to the session
        clubs = create_clubs(num_clubs)
        db.session.add_all(clubs)
        db.session.commit()  # Commit to generate club IDs

        # Create and add events to the session
        events = create_events(users, clubs, min_events_per_club)
        db.session.add_all(events)
        db.session.commit()  # Commit to generate event IDs

        # Create and add announcements to the session
        announcements = create_announcements(users)
        db.session.add_all(announcements)
        db.session.commit()  # Commit to generate announcement IDs

if __name__ == '__main__':
    num_users = int(input("Enter the number of users to create: "))
    num_clubs = 5  # Fixed number of clubs
    min_events_per_club = 4  # Minimum number of events per club

    seed_data(num_users, num_clubs, min_events_per_club)
