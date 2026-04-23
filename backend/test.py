import urllib.request
import json

url = "http://localhost:8080/api/check-url"
data = json.dumps({"url": "http://google.com"}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print("Status Code:", response.status)
        print("Response Body:", response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Status Code:", e.code)
    print("Response Body:", e.read().decode('utf-8'))
except Exception as e:
    print("Error:", str(e))
