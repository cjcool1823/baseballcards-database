from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

def init_db():
    conn = sqlite3.connect('cards.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cards
                 (id INTEGER PRIMARY KEY, name TEXT, team TEXT, year INTEGER, condition TEXT, value REAL, image_url TEXT)''')
    conn.commit()
    conn.close()

@app.route('/add_card', methods=['POST'])
def add_card():
    data = request.json
    conn = sqlite3.connect('cards.db')
    c = conn.cursor()
    c.execute("INSERT INTO cards (name, team, year, condition, value, image_url) VALUES (?, ?, ?, ?, ?, ?)",
              (data['name'], data['team'], data['year'], data['condition'], data['value'], data['image_url']))
    conn.commit()
    conn.close()
    return jsonify({'status': 'Card added!'})

@app.route('/cards', methods=['GET'])
def get_cards():
    conn = sqlite3.connect('cards.db')
    c = conn.cursor()
    c.execute("SELECT * FROM cards")
    cards = c.fetchall()
    conn.close()
    return jsonify(cards)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
