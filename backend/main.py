import os
import sys
from app import create_app

if __name__ == '__main__':
    sys.path.insert(0, os.path.dirname(os.getcwd()) + '/app')

    app = create_app()
    app.run()
