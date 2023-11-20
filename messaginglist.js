import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MessageShape } from './messagingutils';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    setMessages: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  state = {
    fullScreenImageUri: null,
    isModalVisible: false,
  };

  openFullScreenImage = (uri) => {
    this.setState({ fullScreenImageUri: uri, isModalVisible: true });
  };

  closeFullScreenImage = () => {
    this.setState({ fullScreenImageUri: null, isModalVisible: false });
  };

  handleDeleteImage = () => {
    const { messages } = this.props;
    const { fullScreenImageUri } = this.state;

    const updatedMessages = messages.filter(
      (message) => message.uri !== fullScreenImageUri
    );

    this.props.setMessages(updatedMessages);

    this.closeFullScreenImage();
  };

  renderMessageItem = ({ item }) => {
    if (item.type === 'text') {
      return (
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      );
    } else if (item.type === 'image') {
      return (
        <TouchableOpacity
          onPress={() => this.openFullScreenImage(item.uri)}
          style={styles.imageContainer}
        >
          <Image source={item.uri} style={styles.image} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  handleDeleteMessage = (id) => {
    const { messages } = this.props;

    const updatedMessages = messages.filter((message) => message.id !== id);

    this.props.setMessages(updatedMessages);
  };

  renderMessageItem = ({ item }) => {
    const { messages } = this.props;

    if (item.type === 'text') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete Message',
              'Are you sure you want to delete this message?',
      
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => this.handleDeleteMessage(item.id),
                  style: 'destructive',
                },
              ]
            );
          }}
        >
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        </TouchableOpacity>
      );
    } else if (item.type === 'image') {
      return (
        <TouchableOpacity
          onPress={() => this.openFullScreenImage(item.uri)}
          style={styles.imageContainer}
        >
          <Image source={item.uri} style={styles.image} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  render() {
    const { messages } = this.props;
    const { fullScreenImageUri, isModalVisible } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.container}
          inverted
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps='handled'
        />

        {isModalVisible && (
          <Modal
            transparent={false}
            visible={isModalVisible}
            onRequestClose={this.closeFullScreenImage}
          >
            <View style={styles.fullScreenContainer}>
              <Image
                source={fullScreenImageUri}
                style={styles.fullScreenImage}
              />
              <TouchableOpacity
                onPress={this.closeFullScreenImage}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Delete Image',
                    'Are you sure you want to delete this image?',
                    [
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: this.handleDeleteImage,
                        style: 'destructive',
                      },
                    ]
                  );
                }}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
  },
  messageBubble: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#DCF8C6',
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    aspectRatio: 1,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenImage: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
});