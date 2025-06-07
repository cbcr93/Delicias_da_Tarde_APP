import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  box: {
    marginTop: 12,
    backgroundColor: '#eee',
    padding: 10,
    flexDirection: 'row',
    width: '100%',
  },
  side_left: {
    flexDirection: 'column',
    width: '80%',
  },
  title: { fontWeight: 'bold' },
  text: {
    textAlign: 'justify',
    fontSize: 12,
    padding: 12,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    marginBottom: 12,
    borderRadius: 8,
    width: '100%',
  },
});
