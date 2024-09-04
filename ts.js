function post_translate(text, source_lang, target_lang, callback) {
    $.ajax({
        url: 'http://127.0.0.1:5000/translate',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            text: text,
            source_lang: source_lang,
            target_lang: target_lang
        }),
        success: function(data) {
            callback(data.translated_text);
        }
    });
}

function post_detect_language(text, callback) {
    $.ajax({
        url: 'http://127.0.0.1:5000/detect_language',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            text: text
        }),
        success: function(data) {
            callback(data.detected_language);
        }
    });
}

function translate_all(node, lang) {
    if (node.nodeType === 3 && $.trim(node.nodeValue).length > 0) {
        post_translate(node.nodeValue, 'uk', lang, function(translatedText) {
            node.nodeValue = translatedText;
        });
    } else {
        $(node).contents().each(function() {
            translate_all(this);
        });
    }
}

function translate_all_none_language(node, lang) {
    if (node.nodeType === 3 && $.trim(node.nodeValue).length > 0) {
        post_detect_language(node.nodeValue, function(language) {
            post_translate(node.nodeValue, language, lang, function(translatedText) {
                node.nodeValue = translatedText;
            });
        });
    } else {
        $(node).contents().each(function() {
            translate_all_none_language(this);
        });
    }
}

// translate_all(document.body);

translate_all_none_language(document.body);