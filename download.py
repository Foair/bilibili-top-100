import requests
import json

with open('bilibili-top-100.json', encoding='utf_8') as f:
    data = json.load(f)
    for d in data:
        res = requests.get(d['img']).content
        with open(d['img'].split('/')[-1], 'wb') as g:
            g.write(res)
