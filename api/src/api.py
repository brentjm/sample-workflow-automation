#!/usr/bin/env python

""" RESTful Sample-Workflow-Automation service.

Module provides a RESTful API for Sample-Workflow-Automation service.
"""

import logging
from os.path import exists
from flask import Flask, render_template, request
from flask_cors import CORS
from workflow import Workflow
import helper_functions


__author__ = "Brent Maranzano"
__license__ = "MIT"

app = Flask(__name__)
CORS(app)

logger = helper_functions.setup_logger("workflow.api")
app.logger.setLevel(logging.DEBUG)


if exists(".env"):
    workflow = Workflow.from_env_file()


@app.route('/')
def index():
    """Root url view.

    Returns:
        html: default view.
    """
    return render_template('index.html')


@app.route('/getState')
def get_state():
    return workflow.get_state()


@app.route('/setState', methods=['POST'])
def set_state():
    params = request.get_json()
    workflow.set_state(**params)
    return "okay"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)
