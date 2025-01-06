import requests
from bs4 import BeautifulSoup
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
}

# Scrape About Page
about_url = "https://www.kothiyavunu.com/home/about-contact-us/"
response = requests.get(about_url, headers=headers)

soup = BeautifulSoup(response.text, 'html.parser')

titles = soup.find_all('p')

# Write to data/about.csv file
paragraphs = [title.text.strip() for title in titles]
i = 0
with open('data/about.csv', 'w', encoding='utf-8') as f:
    f.write(',text\n')
    for paragraph in paragraphs:
        f.write(f'{i},"{paragraph}"\n')
        i += 1

f.close()

# Scrape glossary page
glossary_url = "https://www.kothiyavunu.com/glossary/"

response = requests.get(glossary_url, headers=headers)

soup = BeautifulSoup(response.text, 'html.parser')

found_trs = soup.find_all('tr')

english = []
indian = []
count = 0
for tr in found_trs:
    extracted = tr.find_all('a')
    for val in extracted:
        val = val.text.strip()
        if not val:
            continue
        if count % 2 == 0:
            english.append(val)
        else:
            indian.append(val)
        count += 1

len_e = len(english)
len_i = len(indian)
print(len_e, len_i)
idx = 0
with open('data/glossary.csv', 'w', encoding='utf-8') as f:
    f.write(',english,indian\n')
    for e, i in zip(english, indian):
        f.write(f'{idx},"{e}","{i}"\n')
        idx += 1

f.close()