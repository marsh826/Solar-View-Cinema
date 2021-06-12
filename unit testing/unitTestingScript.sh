# TALEND API UNIT TESTING SCRIPT

# Login
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=login'

#Logout 
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=logout'

# Register
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=register'

# Display Movies
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymovies'

# Checking Login Status
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=loginstatus'

# Display Profile
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayprofile'

# Update Profile
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=updateprofile'

# Delete Profile
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=deleteprofile'

# Display Movie Session
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaymoviesession'

# Display Seats
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayseats'

# Display Ticket Types
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaytickettype'

# Seat Reservation
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=seatreserve'

# Display Favourite Movies
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayfavouritelist'

# Add Favourite Movies
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=addfavouritemovie'

# Delete Favourite Movies
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=removefavouritemovie'

# Display Latest Movies
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaylatestmovies'

# Display All Sessions
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayallsessions'

# Display Tickets
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displayticket'

# Update Tickets
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=updateticket'

# Delete Tickets
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=deleteticket'

# Admin Login
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminlogin'

# Display Admin Dashboard
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=displaydashboard'

# Admin Display Movies
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindisplaymovies'

# Admin Add Movies
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminaddmovie'

# Admin Update Movies
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminupdatemovie'

# Admin Delete Movies
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=deleteticket'

# Admin Display Movie Sessions
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindisplaysession'

# Admin Add Movie Sessions
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminaddsession'

# Admin Update Movie Sessions
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminaddsession'

# Admin Delete Movie Sessions
curl -i -X POST \
    -H "Content-Type:application/json" \
'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=admindeletesession'

# Admin Pre-set Movie Options
curl -i -X GET \
    'http://localhost/Solar-View-Cinema/appcinema/src/api/api.php?action=adminpresetmoviedata'