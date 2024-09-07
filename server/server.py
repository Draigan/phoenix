# A script for gathering the audio data and picture data for a list of words
# for the phoenix learning game. Pass --update to update the list after modifying
# the wordlist in data.py. Output is to output.json - There is also an endpoint
# at localhost:9999/phoenix where it can be accessed

import os
import json
import time
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pprint
import data
import update
import argparse

# Create command line arg for update
parser = argparse.ArgumentParser(description="Fetch data necessary for phoenix learning app")
parser.add_argument('--update', action='store_true', help='Update the data')
args = parser.parse_args()

categories = data.categories
key =  ""
with open("./api", "r") as file:
    key = file.read().strip()

    
categories = {
    'season': ['fall'],
    'animals': ['dog','cat','animooo', 'chicken'],
    'plants': ['tree','rose','plantoodooo', 'fern'],
              }

allWords = []
allWordsData = []
endpointData= {'allWords': {'list': allWords, 'data': allWordsData,},'wordsByLength': {} }


def update():
    # Iterate through every word in every category
    for category, wordList in categories.items():
        try:
            for word in wordList:
                # Now we have access to the word and the category it belongs to
                # It's time to make some api calls for each word
                finalImages = []
                finalAudioURL = None
                audioURL = f"https://api.dictionaryapi.dev/api/v2/entries/en/{word}"
                audioResponse = requests.get(audioURL)
                if audioResponse.status_code == 200:
                    definitions = audioResponse.json()
                    # We have our json data its time to go deeper. 
                    # Each response has multiple definitions and only some of the definitions
                    # have audio so we must iterate through all of this and pick the us, uk, au 
                    # audio in that order, basically we are just scanning all the possible audio 
                    # locations in the api. Lots of nesting...
                    for definition in definitions:
                        for phonetic in definition['phonetics']:
                            if any(audio != "" for audio in phonetic):
                                if phonetic["audio"] == "au.mp3":
                                    finalAudioURL = phonetic["audio"]

                                if phonetic["audio"][-6:] == "uk.mp3":
                                    finalAudioURL = phonetic["audio"]

                                if phonetic["audio"][-6:] == "us.mp3":
                                    finalAudioURL = phonetic["audio"]
                                    break

                # Gaurd clause before append for audio
                if finalAudioURL:
                    print(finalAudioURL, word)

                else:
                    print(f"No audio found for {word}")
                    continue

#       Gaurd clause before append for pictures
                imgURL =f"https://pixabay.com/api/?key={key}&q={word}&image_type=photo"
                imageResponse = requests.get(imgURL)
                if imageResponse.status_code == 200:
                    imageData = imageResponse.json()["hits"]
                    if len(imageData) >= 8:
                        finalImages = [img["webformatURL"] for img in imageData[:8]]

                if len(finalImages) < 8:
                    print(f"Not enough images found for {word}")
                    continue

                #Append to the allwords category
                allWordsData.append({"word": word, "audio": finalAudioURL, "pictures": finalImages})
                allWords.append(word)

                #Create a new category if the category doesn't exist and append to it
                if category not in endpointData:
                    print('creatingg new category: ', f"{category}")
                    endpointData[category] = {'list': [], 'data': []}
                endpointData[category]['data'].append({'word': word,'audio': finalAudioURL, 'pictures': finalImages })
                endpointData[category]['list'].append(word)
                time.sleep(1)

        except requests.exceptions.HTTPError as errh:
            print("HTTP Error:", errh)
        except requests.exceptions.ConnectionError as errc:
            print("Error Connecting:", errc)
        except requests.exceptions.Timeout as errt:
            print("Timeout Error:", errt)
        except requests.exceptions.RequestException as err:
            print("An error occurred:", err)

    


# Here we filter the different words by length and add it to the endpoint
# This is the wordsByLength key in the json
    for item in allWordsData:
        length = len(item['word'])

        if not str(length) in endpointData['wordsByLength']:
            endpointData['wordsByLength'][str(length)] = {'list': [], 'data': [] }

        endpointData['wordsByLength'][str(length)]['data'].append(item)
        endpointData['wordsByLength'][str(length)]['list'].append(item['word'])

#   Write the data to a json file so that if there is nothing to update, we dont have to do all the api calls everytime
    with open('output.json', 'w') as json_file:
        json.dump(endpointData, json_file, indent = 4)
    

#update if there is no output.json or if we call --update at run
if not os.path.exists('output.json') or args.update:
    update()
# or just set endpoint to the json 
else: 
    if os.path.exists('output.json'):
        with open('output.json', 'r') as json_file:
            endpointData = json.load(json_file)

# Configure flask server and create endpoint
app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return endpointData

app.run(host="0.0.0.0", port=9999)

