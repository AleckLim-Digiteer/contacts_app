import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  lightMode: {
    backgroundColor: '#fff',
  },
  darkMode:{
    backgroundColor: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  contactContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center', // Align items vertically centered
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactDetails: {
    justifyContent: 'center',
    flex: 1, // Allow contact details to take available space
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'flex-start', // Align buttons to the top
    marginLeft: 'auto', // Push buttons to the right
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10, // Space between buttons
    width: 50, // Set a fixed width for uniformity
    height: 50, // Set a fixed height for uniformity
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  gifStyle: {
      width: 200,
      height: 200,
  },

  closeButton: {
    backgroundColor: 'red', // Button color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  emptyContactsText: {
    textAlign: 'center', 
    marginTop: 20, 
    fontWeight: 'bold', 
    fontSize: 30
  },
  contactAmount: {
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default styles;