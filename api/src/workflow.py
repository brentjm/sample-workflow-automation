#!/usr/bin/env python

""" Module with methods to automate sample workflow

This module defines methos to aid in automating sample workflow.
"""

import yaml
import paho.mqtt.client as mqtt
import helper_functions
from pdb import set_trace

__author__ = "Brent Maranzano"
__license__ = "MIT"


logger = helper_functions.setup_logger("workflow.mod")


class Workflow():
    """Class to help sample workflow.
    """

    def __init__(self):
        self._state = {"status": "Hello World from Flask App!"}
        self._projects = {}
        logger.info("instantiated Workflow")

    @classmethod
    def from_env_file(cls, env_file=".env"):
        """Create instance of class from a YAML file.

        Arguments:
            env_file (str): Name of environment file.
        """
        with open(env_file, "rt") as file_obj:
            ENV = yaml.safe_load(file_obj.read())

        workflow = cls()
        #workflow.mqttc = workflow._start_mqtt(ENV["mqtt"]["ip"])
        return workflow

    @staticmethod
    def _start_mqtt(ip, port=1883):
        """Start the MQTT service.

        Arguments:
            ip (str): IP address of the MQTT broker.
            port (int): port number of the MQTT broker.
        """
        def on_connect(client, userdata, flags, rc):
            logger.debug("connected")

        def on_message(client, userdata, msg):
            payload = msg.payload.decode("utf-8", "strict")
            logger.debug(f"topic:{msg.topic}, payload:{payload}")

        def on_disconnect(client, userdata, rc=0):
            logger.debug(f"disconnect {str(rc)}")
            client.loop_stop()

        client = mqtt.Client()
        client.on_connect = on_connect
        client.on_message = on_message
        client.on_disconnect = on_disconnect
        client.connect(ip, port, 60)
        client.loop_start()
        logger.info(f"started MQTT server: {ip}")
        return client

    def get_state(self):
        """Read the current state from the database.

        Returns:
        Dictionary of state information.
        """
        return self._state

    def set_state(self, **kwargs):
        """Set the value in the database of column "key"
        to value "value"

        Arguments:
            kwargs (dict): dictionary of key state parameters to set
        """
        logger.debug(f"arguments: {kwargs}")
        self._state.update(kwargs)

    def set_doe(self, **kwargs):
        self._projects[kwargs["project_name"]] = {
            "header": kwargs["header"],
            "data": kwargs["data"],
            "notes": kwargs["notes"]
        }
        logger.debug(self._projects)

    def get_project_names(self):
        projects = list(self._projects.keys())
        if len(projects) == 0:
            return []
        else:
            return projects

    def get_project_data(self, project_name):
        if project_name in self._projects:
            logger.debug(self._projects[project_name])
            return self._projects[project_name]
        else:
            return {}

    def get_sample_info(self, id):
        for project, data in self._projects.items():
            for sample in data["data"]:
                if sample[-1] == id:
                    return sample


if __name__ == "__main__":
    workflow = Workflow.from_env_file(".env")
