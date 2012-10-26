#==============================================================================#
# app.py                                                                       #
#==============================================================================#
# Imports
import flask, datetime, json, re, pymongo
from backend import settings

#==============================================================================#
# Setup Flask App                                                              #
#==============================================================================#
app = flask.Flask(__name__)

# DB Connections
DB_CONNECTION = pymongo.Connection('localhost', 27017)
DB = DB_CONNECTION.game_off_2012

PORT = getattr(settings, 'PORT', 8080)
ENV = getattr(settings, 'ENV', 'develop')

#==============================================================================#
# Utility Call Functions                                                       #
#==============================================================================#

#==============================================================================#
# Static Endpoints                                                             #
#==============================================================================#
def render_skeleton(template_name='index.html', **kwargs):
    return flask.render_template(template_name, **kwargs)

#------------------------------------------------------------------------------#
# Home                                                                         #
#------------------------------------------------------------------------------#
@app.route('/')
def home():
    ret = {}
    template_name = 'home.html'

    return render_skeleton(template_name, **ret)

#==============================================================================#
# Run Server                                                                   #
#==============================================================================#
if __name__ == "__main__":
    if ENV == 'develop':
        app.debug = True
        app.run(port=PORT)
