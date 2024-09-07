import React from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <WebView
        source={{ uri: 'https://phoenix.draigan.com' }}
        style={styles.webview}
        scrollEnabled={false}
        nestedScrollEnabled={false}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        injectedJavaScript={`
          (function() {
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.getElementsByTagName('head')[0].appendChild(meta);
            
            var style = document.createElement('style');
            style.innerHTML = \`
              body {
                touch-action: none; /* Prevent touch gestures */
                overflow: hidden; /* Prevent scrolling */
                user-select: none; /* Prevent text selection */
              }
            \`;
            document.head.appendChild(style);
          })();
        `}
        onShouldStartLoadWithRequest={() => true}
        allowsInlineMediaPlayback={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
