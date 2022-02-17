import argparse
import logging
import requests
from time import sleep


logger = logging.getLogger('dissocam-tests')
logger.setLevel(logging.DEBUG)
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


def set_state(state):
    url = f"http://{args.ip}:{args.port}/setState"
    send(url, data=state)


def get_state():
    url = f"http://{args.ip}:{args.port}/getState"
    send(url)


def get_recordings():
    url = f"http://{args.ip}:{args.port}/getRecordings"
    send(url)


def start_preview():
    url = f"http://{args.ip}:{args.port}/startPreview"
    send(url)


def stop_preview():
    url = f"http://{args.ip}:{args.port}/stopPreview"
    send(url)


def start_timelapse():
    url = f"http://{args.ip}:{args.port}/startTimelapse"
    send(url)


def stop_timelapse():
    url = f"http://{args.ip}:{args.port}/stopTimelapse"
    send(url)


def send(url, data=None):
    if data is None:
        logger.debug(f"sent: {url}")
        r = requests.get(url)
    else:
        logger.debug(f"sent: url: {url}, data: {data}")
        r = requests.post(url, json=data)
    response = r.content.decode("utf-8")
    logger.debug(f"received: {response}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Test dissocam API."
    )
    parser.add_argument(
        "--ip",
        help="IP address of REST API.",
        type=str,
        default="192.168.1.9"
    )
    parser.add_argument(
        "--port",
        help="port number of REST API.",
        type=int,
        default=8000
    )
    args = parser.parse_args()
    set_state({
        "basename": "dissocam_test",
        "interval": 10,
        "duration": 120,
        "vessels": [1, 2, 3, 4, 5]
    })
    get_state()
    start_preview()
    sleep(2)
    stop_preview()
    start_timelapse()
    get_recordings()
