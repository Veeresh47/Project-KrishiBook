import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { hp, wp } from '../../constants/helpers/common'
import { theme } from '../../constants/theme'
import ScreenWrapper from '../../components/ScreenWrapper';

const notificationsData = [
  { id: '1', message: 'New update available for your app.' },
  { id: '2', message: 'Your order has been shipped.' },
  { id: '3', message: 'Reminder: Water your crops today!' },
  { id: '4', message: 'New messages in your inbox.' },
  { id: '5', message: 'Seasonal sale starting soon!' }
];

const Notifications = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationText}>{item.message}</Text>
    </View>
  );

  return (
    <ScreenWrapper style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notificationsList}
      />
    </ScreenWrapper>
  );
}

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
    paddingTop: hp(2),
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: hp(2),
  },
  notificationsList: {
    paddingBottom: hp(3), // Extra space at the bottom
  },
  notificationCard: {
    padding: wp(4),
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.xl,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  notificationText: {
    fontSize: hp(2),
    color: theme.colors.text,
  },
});
