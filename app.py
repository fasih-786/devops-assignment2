from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# List to store to-do items
todos = []

@app.route('/')
def index():
    # Render the main HTML page
    return render_template("index.html")

# Endpoint to retrieve all to-do items
@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify({"todos": todos})

# Endpoint to add a new to-do item
@app.route('/add', methods=['POST'])
def add_todo():
    data = request.get_json()
    item = data.get("item")
    if item:
        todos.append(item)
        return jsonify({"message": "Item added", "todos": todos}), 201
    return jsonify({"message": "No item provided"}), 400

# Endpoint to delete a to-do item
@app.route('/delete', methods=['DELETE'])
def delete_todo():
    data = request.get_json()
    item = data.get("item")
    if item in todos:
        todos.remove(item)
        return jsonify({"message": "Item deleted", "todos": todos}), 200
    return jsonify({"message": "Item not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
