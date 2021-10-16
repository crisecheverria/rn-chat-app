import {StyleSheet, Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');
const heightLogo = height * 0.18;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logo: {
    width: heightLogo,
    height: heightLogo,
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 30,
  },
  mt10: {
    marginTop: 10,
  },
});
