from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pprint


items = "dog cat at bunny rose blast".split(" ")
key =  ""
with open("./api", "r") as file:
    key = file.read().strip()

    

allWordsData = []
endpointData= {'allWords': {'list': items, 'data': allWordsData,},'wordsByLength': {}}


for item in items:
    try:

        # Images and audio for object to be pushed to endpointData
        finalImages = []
        finalAudioURL = None
        # Request audio 
        # We are doing audio first because its possible to not have any
        # In which case we have nothing to add continue
        audioURL = f"https://api.dictionaryapi.dev/api/v2/entries/en/{item}"
        audioResponse = requests.get(audioURL)

        if audioResponse.status_code == 200:
            audioData = audioResponse.json()[0]['phonetics']
            # Checking to make sure there is at least 1 audio file
            if any(audio != "" for audio in audioData):
                # Setting the audio file to the USA version if available
                for url in audioData:
                    # If the url is not empty set finalAudio to it
                    # This is just to ensure we have some audio incase
                    # there is no US version, but if we do find a us version
                    # set finalAudioURL to that and break out of the loop
                    if url["audio"] != "":
                        finalAudioURL = url["audio"]
                    # We prefer uk over aus 
                    if url["audio"][-6:] == "uk.mp3":
                        # print("found uk audio")
                        finalAudioURL = url["audio"]
                    # We found us so we have our audio
                    if url["audio"][-6:] == "us.mp3":
                        # print("found us audio")
                        finalAudioURL = url["audio"]
                        break

        # If there are no valid audio urls, we need to skip to the next word
        if not finalAudioURL:
            print(f"No audio found for {item}")
            continue

        
        # Request pictures
        imgURL =f"https://pixabay.com/api/?key={key}&q={item}&image_type=photo"
        imageResponse = requests.get(imgURL)
        if imageResponse.status_code == 200:
            imageData = imageResponse.json()["hits"]
            if len(imageData) >= 8:
                finalImages = [img["webformatURL"] for img in imageData[:8]]

        if len(finalImages) < 8:
            print(f"Not enough images found for {item}")
            continue


        allWordsData.append({"word": f"{item}", "audio": finalAudioURL, "pictures": finalImages})

    except requests.exceptions.HTTPError as errh:
        print("HTTP Error:", errh)
    except requests.exceptions.ConnectionError as errc:
        print("Error Connecting:", errc)
    except requests.exceptions.Timeout as errt:
        print("Timeout Error:", errt)
    except requests.exceptions.RequestException as err:
        print("An error occurred:", err)

for item in allWordsData:
    length = len(item['word'])

    if not str(length) in endpointData['wordsByLength']:
        endpointData['wordsByLength'][str(length)] = {'list': [], 'data': [] }

    endpointData['wordsByLength'][str(length)]['data'].append(item)
    endpointData['wordsByLength'][str(length)]['list'].append(item['word'])

        
    # wordsByLength[length]
    # print(item['word'])

    



pprint.pprint(endpointData)
app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return endpointData

app.run(host="0.0.0.0", port=9999)



