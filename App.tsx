import React, { useEffect, useState } from 'react';
import { Modal, Image, View, TouchableOpacity, Text, SafeAreaView, useColorScheme, FlatList, RefreshControl, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Contact from './model/contact';
import { useFetchContactQuery } from './redux/services/contactAPI';

interface ContactResponse {
  results: Contact[];
}

function App(): React.JSX.Element {
  const [ refreshing, setRefreshing ] = useState(false);
  const [ visibleData, setVisibleData ] = useState<Contact[]>([]);
  const [ page, setPage ] = useState(1);
  const [ callModalVisible, setCallModalVisible ] = useState(false);
  const [ messageModalVisible, setMessageModalVisible ] = useState(false);
  const { control, handleSubmit } = useForm();
  const [ contactCount, setContactCount ] = useState(0);
  const { data: contacts, isFetching } = useFetchContactQuery(contactCount) as { data: ContactResponse | undefined; isFetching: boolean };
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const isDarkMode = useColorScheme() === 'dark';
  
  const onRefresh = () => {
    setRefreshing(true);
    getContacts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const getContacts = async () => {
    try {
      // If contacts is not null and has at least 5 items and less than 500 items and not fetching 
      if (contacts && contacts.results.length >= 5 && contacts.results.length <= 500 && isFetching == false) {  
        setVisibleData(contacts.results.slice(0, 10)); // Show only the first 10 items
        setErrorMessage(null);
      } 
      else if(!contacts && isFetching == false) { // If contacts is null and not fetching
        setErrorMessage('Failed to fetch contacts. Please try again later.');
        onRefresh();
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching contacts.');
      console.error(error);
    }
  };

  const loadMore = async () => {
    if (contacts && visibleData.length < contacts.results.length) {
      const nextPage = page + 1;
      setPage(nextPage);
      setVisibleData( contacts.results.slice(0, nextPage * 10)); // Load next 10 items
    }
  };

  const onSubmit = (data: any) => {
    const count = parseInt(data.contactCount);
    if (!isNaN(count) && count >= 5 && count <= 500) {
      setContactCount(count);
      getContacts(); // Fetch contacts after updating the count
    } else {
      Alert.alert('Invalid Input', 'Please enter a number between 5 and 500.')
    }
  };

  useEffect(() => {
    if (contacts) {
      getContacts();
    } else {
      onRefresh();
    }
  }, [contacts]);

  const handleCallPress = () => {
    setCallModalVisible(true); // Show modal on button press
  };

  const handleMessgePress = () => {
    setMessageModalVisible(true); // Show modal on button press
  };

  const viewCallModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={callModalVisible}
        onRequestClose={() => setCallModalVisible(false)} // Close modal
      >
        <View style={styles.modalView}>
          <Image source={{ uri: "https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif" }} style={styles.gifStyle} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setCallModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const viewMessageModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={messageModalVisible}
        onRequestClose={() => setMessageModalVisible(false)} // Close modal
      >
        <View style={styles.modalView}>
          <Image source={{ uri: "https://media4.giphy.com/media/13GIgrGdslD9oQ/giphy.gif?cid=6c09b952wufaoo6itjf27uulwdkdoawsaaueh6a37lb1epax&ep=v1_gifs_search&rid=giphy.gif" }} style={styles.gifStyle} />
          <TouchableOpacity style={styles.closeButton} onPress={() => setMessageModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={styles.contactContainer}>
      <Image source={{ uri: item.picture.thumbnail }} style={styles.image} />
      <View style={styles.contactDetails}>
        <Text style={[styles.name, isDarkMode ? { color: 'white' } : { color: 'black' }]}>{item.name.first} {item.name.last}</Text>
        <Text style={isDarkMode ? { color: 'white' } : { color: 'black' }}>Gender: {item.gender}</Text>
        <Text style={isDarkMode ? { color: 'white' } : { color: 'black' }}>Email: {item.email}</Text>
        <Text style={isDarkMode ? { color: 'white' } : { color: 'black' }}>Cellphone: {item.cell}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCallPress}>
          <Icon name="call" size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleMessgePress}>
          <Icon name="chatbubble-ellipses" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const contactInputForm = () => {
    return(
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput 
              style ={[{ backgroundColor: 'white' }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Enter number of contacts (5-500)"
              placeholderTextColor="gray"
              keyboardType="numeric"
            />
          )}
          name="contactCount"
          rules={{ required: true }}
        />
        <Button title="Fetch Contacts" onPress={handleSubmit(onSubmit)} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[isDarkMode ? styles.darkMode : styles.lightMode, { flex: 1 }]}>
      <Text style={[styles.header, isDarkMode ? { color: 'white' } : { color: 'black' }]}>
        Contacts App
      </Text>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}

      {!isFetching && contacts && <Text style={[styles.contactAmount, isDarkMode ? { color: 'white' } : { color: 'black' }]}>Total contacts listed: {contacts.results.length}</Text>}
      
      {contactInputForm()}

      {isFetching && <ActivityIndicator />}

      {!isFetching && visibleData.length === 0 && (
        <Text style={[styles.emptyContactsText, isDarkMode ? { color: 'white' } : { color: 'black' }]}>No contacts available.</Text>
      )}

      {!isFetching && contacts && contacts.results.length >= 5 && contacts.results.length <= 500 && (
        <FlatList
          data={visibleData}
          renderItem={renderItem}
          keyExtractor={item => item.login.uuid}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}

      {viewCallModal()}
      {viewMessageModal()}
    </SafeAreaView>
  );
}

export default App;