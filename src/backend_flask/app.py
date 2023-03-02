import time
from flask import Flask, render_template, request
import werkzeug
import validators

from ping3 import ping
import ntplib
import dns.resolver
import socket
import requests

import threading

import asyncio
import json
import ast
from asyncua import Client
import logging

logger = logging.getLogger("asyncua")
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)


@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404


@app.errorhandler(werkzeug.exceptions.HTTPException)
def internal_error(error):
    return render_template("500.html"), 500


@app.route("/conntest/api/time")
def get_current_time():
    return {"time": time.time()}


@app.route("/conntest/api/ping/single")
def get_ping():
    hostname = request.args.get("h")
    if (
        validators.domain(hostname)
        or validators.ipv4(hostname)
        or validators.ipv6(hostname)
    ):
        response = ping(hostname)

        if response == None:
            if validators.domain(hostname):
                response = f"hostname {hostname} resolved, ping timed out"
            else:
                response = "ping timed out"
            status = 3
        elif response == False:
            response = f"cannot resolve hostname '{hostname}'"
            status = 2
        else:
            response = f"{hostname} responded in {1000*response:.3f} ms"
            status = 1
    else:
        response = "invalid - enter domain ('google.com') or ip address ('8.8.8.8')"
        status = 4

    return {"response": response, "status": status}


@app.route("/conntest/api/ntp")
def get_ntp():
    hostname = request.args.get("h")
    if (
        validators.domain(hostname)
        or validators.ipv4(hostname)
        or validators.ipv6(hostname)
    ):
        try:
            ntprequest = ntplib.NTPClient().request(hostname)

            response = f"{time.ctime(ntprequest.tx_time)}, offset {ntprequest.offset}"
            status = 1

        except Exception as ex:
            response = str(ex)
            status = 3
    else:
        response = (
            "invalid - enter domain ('at.pool.ntp.org') or ip address ('8.8.8.8')"
        )
        status = 4

    return {"response": response, "status": status}


@app.route("/conntest/api/dns")
def get_dns():
    hostname = request.args.get("h")
    if validators.domain(hostname):
        try:
            dnsresponse = dns.resolver.resolve(hostname)
            response = f"{', '.join([ipval.to_text() for ipval in dnsresponse])}"
            status = 1

        except Exception as ex:
            response = str(ex)
            status = 2
    else:
        response = "invalid - enter domain ('google.at')"
        status = 3

    return {"response": response, "status": status}


@app.route("/conntest/api/dns/reverse")
def get_dns_reverse():
    hostname = request.args.get("h")
    if validators.ipv4(hostname) or validators.ipv6(hostname):
        try:
            response = f"{socket.gethostbyaddr(hostname)[0]}"
            status = 1

        except Exception as ex:
            response = str(ex)
            status = 2
    else:
        response = "invalid - enter domain ('google.at')"
        status = 3

    return {"response": response, "status": status}


next_index = 1
node_ids = {}
node_id = ""

opc_hostname = ""
opc_user = ""
opc_pwd = ""

connected_flag = False
disconnect_flag = False
info_flag = False
busy_flag = False

browse_response = ""
browse_status = 0

node_info_response = ""
node_info_status = 0


async def client_loop():
    global opc_hostname
    global opc_user
    global opc_pwd

    global connected_flag
    global disconnect_flag
    global info_flag
    global busy_flag

    global browse_response
    global browse_status

    global next_index
    global node_ids

    async def get_tree(browse_node):

        global next_index
        global node_ids

        node_name = await browse_node.read_display_name()

        if browse_node.nodeid.NodeIdType == 0:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};i="
        elif browse_node.nodeid.NodeIdType == 1:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};i="
        elif browse_node.nodeid.NodeIdType == 2:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};i="
        elif browse_node.nodeid.NodeIdType == 3:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};s="
        elif browse_node.nodeid.NodeIdType == 4:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};g="
        else:
            idtype = f"ns={browse_node.nodeid.NamespaceIndex};b="

        node_nodeid = f"{idtype}{browse_node.nodeid.Identifier}"

        node_dict = {
            "id": str(next_index),
            "name": node_name.Text,
            "nodeid": node_nodeid,
            "children": [],
        }

        node_ids[node_dict["id"]] = node_nodeid

        next_index = next_index + 1

        browse = await browse_node.get_children()

        if not browse:
            return node_dict
        else:
            node_dict["children"] = [await get_tree(child) for child in browse]
            return node_dict

    async def get_info():

        global node_id
        global node_info_response
        global node_info_status
        global busy_flag
        global info_flag

        try:

            current_node = client.get_node(node_id)

            info_name = (await current_node.read_display_name()).Text
            info_id = node_id
            info_class = str(await current_node.read_node_class())[10:]

            if info_class == "Variable":
                info_data_type = str(
                    await current_node.read_data_type_as_variant_type()
                )[12:]

                if info_data_type == "ByteString":
                    info_value = "unknown"
                else:
                    info_value = str(await current_node.read_value())

                node_info_status = 1
            else:
                info_data_type = "none"
                info_value = "none"
                node_info_status = 2

            answer = {
                "name": info_name,
                "id": info_id,
                "class": info_class,
                "datatype": info_data_type,
                "value": info_value,
            }

            node_info_response = json.dumps(answer)

        except Exception as ex:
            node_info_response = str(ex)
            node_info_status = 3
            info_flag = False
            busy_flag = False

    try:
        next_index = 1
        node_ids = {}

        client = Client(url=opc_hostname)

        if (opc_user and opc_pwd):
            client.set_user(opc_user)
            client.set_password(opc_pwd)

        await client.connect()
        connected_flag = True

        nodes = await get_tree(client.nodes.root)

        browse_response = [next_index - 1, json.dumps(nodes)]
        browse_status = 1
        busy_flag = False

        disconnect_flag = False

        while connected_flag:
            time.sleep(0.1)

            if disconnect_flag:
                await client.disconnect()
                disconnect_flag = False
                connected_flag = False
                info_flag = False
                busy_flag = False
            else:
                if info_flag:
                    info_flag = False
                    await get_info()
                    busy_flag = False
    except Exception as ex:
        disconnect_flag = True
        connected_flag = False
        busy_flag = False
        browse_response = f"Unable to connect to {opc_hostname}"
        browse_status = 2


def client_loop_sync():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)

    loop.run_until_complete(client_loop())
    loop.close()


@app.route("/conntest/api/opcua")
async def get_opcua():

    global opc_hostname
    global opc_user
    global opc_pwd
    global connected_flag
    global disconnect_flag
    global busy_flag
    global browse_response
    global browse_status

    opc_hostname = request.args.get("h")
    opc_user = request.args.get("u")
    opc_pwd = request.args.get("p")

    if connected_flag:
        disconnect_flag = True
        browse_response = "Disconnected"
        browse_status = 4
        return {"response": browse_response, "status": browse_status}
    else:
        if opc_hostname.startswith("opc.tcp://"):

            busy_flag = True
            disconnect_flag = True
            thread = threading.Thread(target=client_loop_sync)
            thread.start()

            while busy_flag:
                time.sleep(0.1)

            return {"response": browse_response, "status": browse_status}
        else:
            browse_response = "invalid - enter an OPC UA connection string ('opc.tcp://192.168.0.1:48010')"
            browse_status = 3

        return {"response": browse_response, "status": browse_status}


@app.route("/conntest/api/opcua/node")
async def get_node():
    global node_id
    global node_ids
    global node_info_response
    global node_info_status
    global info_flag
    global busy_flag
    global disconnect_flag

    if connected_flag:
        try:
            node_id = node_ids[request.args.get("i")]

            info_flag = True
            busy_flag = True

            while busy_flag:
                print("looking for info")
                time.sleep(0.1)
        except Exception as ex:
            node_info_response = str(ex)
            node_info_status = 3
            info_flag = False
            busy_flag = False

        return {"response": node_info_response, "status": node_info_status}
    else:
        return {"response": "Not connected to server", "status": 3}

@app.route("/conntest/api/opcua/status")
async def get_opcua_status():
    global browse_response
    global browse_status
    global opc_hostname
    global opc_user
    global opc_pwd

    if not opc_hostname:
        opc_hostname = "opc.tcp://192.168.109.1:48010"

    return {"response": browse_response, "status": browse_status, "hostname": opc_hostname, "user": opc_user, "pwd": opc_pwd}

@app.route("/conntest/api/http")
def get_http():
    hostname = request.args.get("h")
    type = request.args.get("t")
    headers = request.args.get("hdrs")
    body = request.args.get("b")
    verify = request.args.get("v")

    if (
        validators.url(hostname)
    ):
        match type:
            case "get":
                try:
                    if headers:
                        httprequest = requests.get(hostname, verify=(verify=="true"), headers=ast.literal_eval(headers))
                    else:
                        httprequest = requests.get(hostname, verify=(verify=="true"))
                    response = httprequest.text
                    status = 1
                except Exception as ex:
                    response = str(ex)
                    status = 3
            case "post":
                try:
                    if headers and body:
                        httprequest = requests.post(hostname, verify=(verify=="true"), headers=ast.literal_eval(headers), data=body)
                    elif headers:
                        httprequest = requests.post(hostname, verify=(verify=="true"), headers=ast.literal_eval(headers))
                    elif body:
                        httprequest = requests.post(hostname, verify=(verify=="true"), data=body)
                    else:
                        httprequest = requests.post(hostname, verify=(verify=="true"))
                    response = httprequest.text
                    status = 1
                except Exception as ex:
                    response = str(ex)
                    status = 3
            case "put":
                try:
                    if headers and body:
                        httprequest = requests.put(hostname, verify=(verify=="true"), headers=ast.literal_eval(headers), data=body)
                    elif headers:
                        httprequest = requests.put(hostname, verify=(verify=="true"), headers=ast.literal_eval(headers))
                    elif body:
                        httprequest = requests.put(hostname, verify=(verify=="true"), data=body)
                    else:
                        httprequest = requests.put(hostname, verify=(verify=="true"))
                    response = httprequest.text
                    status = 1
                except Exception as ex:
                    response = str(ex)
                    status = 3
            case _:
                response = "bad request type"
                status = 3
    else:
        response = (
            "invalid - enter valid URL ('https://api.publicapis.org/random')"
        )
        status = 4

    return {"response": response, "status": status}