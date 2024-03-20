# Pre-trained language translation models from huggingface.co 

from transformers import MarianMTModel, MarianTokenizer  

# Makes it so unimportant / annoying user warnings don't print with official output.  

import warnings 

# requests and BeautifulSoup are used for webscraping.  

import requests 

from bs4 import BeautifulSoup 

# Dumps all text from the file into an array 

import numpy as np 

warnings.filterwarnings('ignore') 

r = requests.get('http://efasano.myweb.usf.edu/index.html') 

soup = BeautifulSoup(r.text, 'lxml') 

website_text = soup.body.get_text(' ', strip=True) 

file1 = open("data.txt", "w") 

file1.write(website_text)  

file1.close()  

file1 = open("data.txt", "r") 

src_text = np.genfromtxt("data.txt", dtype=str, encoding=None, delimiter=".") 

file1.close() 

 
 

# uncomment to type in individual sentences and phrases. 

#src_text = [ 

#    ">>es<< Hi, my name's Kronos, and my life is kinda crazy."" 

#] 

 
 

# Also downloaded are Helsinki-NLP/opus-mt-en-uk, Helsinki-NLP/opus-mt-en-sla, Helsinki-NLP/opus-mt-en-ROMANCE, Helsinki-NLP/opus-mt-en-uk, Helsinki-NLP/opus-mt-en-trk 

# Uncomment to see the very poor Greek translation. 

# model_name = "Helsinki-NLP/opus-mt-en-grk" 

 
 

language = input("Multiple languages for translation are available. Enter Ukrainian, Russian or Armenian. (Case Sensitive)") 

 
 

model_name = "blank" 

 
 

if language == "Ukrainian": 

  model_name = "Helsinki-NLP/opus-mt-en-uk" 

elif language =="Russian": 

  model_name = "Helsinki-NLP/opus-mt-en-ru" 

elif language =="Armenian": 

  model_name = "Helsinki-NLP/opus-mt-en-hy" 

 
 

for x in src_text: 

 
 

  #model_name = "Helsinki-NLP/opus-mt-en-uk" 

  tokenizer = MarianTokenizer.from_pretrained(model_name) 

 
 
 

  model = MarianMTModel.from_pretrained(model_name) 

  #translated = model.generate(**tokenizer(src_text, return_tensors="pt", padding=True)) 

  translated = model.generate(**tokenizer(x, return_tensors="pt", padding=True)) 

  tgt_text = [tokenizer.decode(t, skip_special_tokens=True) for t in translated] 

 
 

  print(tgt_text) 
