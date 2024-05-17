import os

SECRET_KEY = "GrupoDomModtecnologia"

SQLALCHEMY_DATABASE_URI = \
    'mysql://{user}:{password}@{server}:{port}/{database}'.format(
        user = os.environ['user'],
        password = os.environ['password'],
        server = os.environ['server'],
        port = os.environ['port'],
        database = "automacao"
    )

DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + "/static"