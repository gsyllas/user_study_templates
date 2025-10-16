from flask import Flask, render_template, request, jsonify
import json
from datetime import datetime
import os
import uuid


app = Flask(__name__, static_url_path='/static')

@app.route("/")
def index():

    # serve the main html document
    return render_template("index.html")


@app.route('/postmethod', methods=['POST'])
def postmethod():
    print("Incoming data from client... ")
    # Receive post request from client. 
    # Message data in json format
    data = request.get_json()
    print(data)
    
    # Store data to local fodler in server e.g. in './answers/'
    # Filename should be for e.g. './answers/*.json'
    
    # Ensure the answers folder exists
    os.makedirs("answers", exist_ok=True)
    
    # Build a unique filename with timestamp + random ID
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_id = uuid.uuid4().hex[:6]
    filename = f"answers/survey_{timestamp}_{unique_id}.json"
    
    # Save to file
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    # Return ack to client
    return jsonify({"status": "DONE", "file": filename})



if __name__ == "__main__":
    # localhost in port 1988 e.g. http://0.0.0.0:1988
    app.run(host='0.0.0.0', port=1988 ,debug=True)