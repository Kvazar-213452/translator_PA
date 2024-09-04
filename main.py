from flask import Flask, request, jsonify
from deep_translator import GoogleTranslator
from flask_cors import CORS
from langdetect import detect, LangDetectException

app = Flask(__name__)
CORS(app)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    text = data.get('text')
    source_lang = data.get('source_lang', 'uk')  
    target_lang = data.get('target_lang', 'en')  

    try:
        translated = GoogleTranslator(source=source_lang, target=target_lang).translate(text)
        return jsonify({'translated_text': translated})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/detect_language', methods=['POST'])
def detect_language():
    data = request.json
    text = data.get('text')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    try:
        detected_lang = detect(text)
        return jsonify({'detected_language': detected_lang})
    except LangDetectException as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)