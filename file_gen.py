import os

# Function to generate HTML and JS files
def generate_files(file_count):
    for i in range(1, file_count + 1):
        html_content = f"""<html><head><script src="file{i}.js"></script></head><body><a href="file{(i % file_count) + 1}.html">Next: {i}</a></body></html>"""
        js_content = """document.cookie = 'testCookie=testValue; Path=/{i}';"""

        with open(f"file{i}.html", "w") as html_file:
            html_file.write(html_content)

        with open(f"file{i}.js", "w") as js_file:
            js_file.write(js_content)

# Generate x pairs of HTML and JS files
generate_files(100)
