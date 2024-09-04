def minify_js(js_code):
    return ' '.join(js_code.split())

def main():
    with open('script.js', 'r') as file:
        js_code = file.read()
    
    minified_code = minify_js(js_code)
    
    with open('minified_script.js', 'w') as minified_file:
        minified_file.write(minified_code)

if __name__ == '__main__':
    main()