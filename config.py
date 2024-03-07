import os

SECRET_KEY = "GrupoDomModtecnologia"

SQLALCHEMY_DATABASE_URI = \
    'mysql://{user}:{password}@{server}:{port}/{database}'.format(
        user='doadmin',
        password='AVNS_krWo7any_BYKtuXc22J',
        server='db-mysql-nyc3-41377-do-user-15880071-0.c.db.ondigitalocean.com',
        port=25060,
        database='automacao'
    )

DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + "/static"