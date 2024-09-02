import time
from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pprint
import data


categories = data.categories
key =  ""
with open("./api", "r") as file:
    key = file.read().strip()

    
# categories = {
#     'season': ['fall'],
#     'animals': ['dog','cat','animooo', 'chicken'],
#     'plants': ['tree','rose','plantoodooo', 'fern'],
#               }

allWords = []
allWordsData = []
endpointData= {'allWords': {'list': allWords, 'data': allWordsData,},'wordsByLength': {} }

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
for item in allWordsData:
    length = len(item['word'])

    if not str(length) in endpointData['wordsByLength']:
        endpointData['wordsByLength'][str(length)] = {'list': [], 'data': [] }

    endpointData['wordsByLength'][str(length)]['data'].append(item)
    endpointData['wordsByLength'][str(length)]['list'].append(item['word'])

# pprint.pprint(endpointData)
app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return endpointData

app.run(host="0.0.0.0", port=9999)
#
#
#
