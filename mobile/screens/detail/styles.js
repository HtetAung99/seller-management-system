import { StyleSheet } from 'react-native';
import { width, height } from '../../constants';

export default styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(74, 72, 67, .4)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layout: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    position: 'relative',
  },
  'p-img': {
    height: height * 0.4,
    width: '100%',
  },
  'p-detail': {
    width: '100%',
    height: '50%',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  'time-code': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  'p-info': {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'p-name': {
    fontSize: 22,
    fontWeight: '700',
    maxWidth: 300,
  },
  'price-qty': {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  'p-barcode': {
    marginBottom: 8,
    fontSize: 16,
  },
  'p-stock': {
    fontSize: 16,
    textAlign: 'right',
  },
  'p-article-no': {
    fontSize: 18,
    fontWeight: '600',
  },
  'wh-wrapper': {
    marginBottom: 10,
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  warehouse: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    margin: 2,
  },
  'wh-name': {
    paddingHorizontal: 5,
    paddingVertical: 2.5,
  },
  tabContainerStyle: {
    width: '100%',
  },
  tabStyle: {
    borderWidth: 0,
    borderColor: '#fff',
    paddingVertical: 10,
  },
  tabTextStyle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: '600',
  },
  activeTabStyle: {
    borderWidth: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  activeTabTextStyle: {
    color: '#000',
  },
  text: {
    color: 'gray',
    paddingTop: 6,
    lineHeight: 20,
    paddingBottom: 10,
    paddingHorizontal: 6,
  },
  'price-edit-btn': {
    position: 'absolute',
    width: '90%',
    flexDirection: 'row',
    bottom: height * 0.05,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  'edit-btn-ctn': {
    width: '100%',
    backgroundColor: '#fff',
    height: height * 0.1,
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
  },
  btn: {
    backgroundColor: '#434242',
    borderRadius: 8,
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'btn-text': {
    fontSize: 18,
    color: '#fff',
  },
  category: {
    color: '#aba9a9',
    fontSize: 15,
    marginVertical: 10,
  },
  'collapse-container': {
    padding: 13,
    borderTopWidth: 2,
    borderColor: '#E0E0E0',
  },
  collapse: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'collapse-header': {
    fontSize: 18,
    fontWeight: '700',
    marginRight: 'auto',
  },
  'collapse-content': {
    marginTop: 8,
    marginLeft: 2,
  },
});
