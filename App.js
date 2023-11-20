import React, { useState } from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import MessageList from './components/messaginglist';
import { createTextMessage } from './components/messagingutils';

export default function App() {
  const [messages, setMessages] = useState([
    {
      type: 'image',
      id: 3,
      uri: require('./assets/parismaps.png'),
      resizeMode: 'contain',
    },
    createTextMessage('You can see the maps below, see you!'),
    createTextMessage('Here is the venue for later'),
    createTextMessage('Hi James!'),
    
    {
      type: 'image',
      id: 4,
      uri: require('./assets/museum.png'),
      resizeMode: 'contain',
    },
  ]);

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleFullscreen = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <View style={styles.content}>
        <MessageList
          messages={messages}
          toggleFullscreen={toggleFullscreen}
          setMessages={setMessages}
        />
      </View>
      <Modal
        visible={fullscreenImage !== null}
        transparent={true}
        onRequestClose={closeFullscreen}
      >
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeFullscreen}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Image source={fullscreenImage?.uri} style={styles.fullscreenImage} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.04)',
    backgroundColor: 'white',
  },
  fullscreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
  },
});