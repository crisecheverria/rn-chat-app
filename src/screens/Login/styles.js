import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  buttonGroupContainer: {height: 30, borderRadius: 10},
  selectedButtonGroup: {backgroundColor: '#ccc'},
  ml10: {
    marginLeft: 5,
  },
  headerName: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
