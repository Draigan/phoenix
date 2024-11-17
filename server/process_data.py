# This used to be something else. I did a hack job on it.
import json
import os
import data


categories = data.categories

    
# categories = {
#     'season': ['fall'],
#     'animals': ['dog','cat','animooo', 'chicken'],
#     'plants': ['tree','rose','plantoodooo', 'fern'],
#               }

endpointData= {'allWords': {'list': data.allWords, 'data': [],},'wordsByLength': {} }


def update():
    # Iterate through every word in every category
    for category, wordList in categories.items():
        for word in wordList:
            #Create a new category if the category doesn't exist and append to it
            if category not in endpointData:
                print('creatingg new category: ', f"{category}")
                endpointData[category] = {'list': [], 'data': []}
            endpointData[category]['data'].append({'word': word,'audio': "", 'pictures': []})
            endpointData[category]['list'].append(word)



# Here we filter the different words by length and add it to the endpoint
# This is the wordsByLength key in the json
    print(data.allWords)
    for item in data.allWords:
        # print("TESTITEM",item)
        length = len(item)

        if not str(length) in endpointData['wordsByLength']:
            endpointData['wordsByLength'][str(length)] = {'list': [], 'data': [] }

        endpointData['wordsByLength'][str(length)]['data'].append(item)
        endpointData['wordsByLength'][str(length)]['list'].append(item)

    with open('output.json', 'w') as json_file:
        json.dump(endpointData, json_file, indent = 4)
    #
    #
update()
