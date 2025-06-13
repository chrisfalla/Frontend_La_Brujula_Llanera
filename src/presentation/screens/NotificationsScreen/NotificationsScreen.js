import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  StatusBar,
  Animated,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, TextStyles } from '../../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de ejemplo para notificaciones
const SAMPLE_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Nueva promoción',
    message: 'Restaurante El Oasis tiene una promoción especial este fin de semana',
    type: 'promo',
    isRead: false,
    time: '10 min',
    image: 'https://randomuser.me/api/portraits/men/35.jpg'
  },
  {
    id: '2',
    title: 'Recordatorio',
    message: 'Tu reserva en Hotel Camoruco es mañana a las 2:00 PM',
    type: 'reminder',
    isRead: false,
    time: '3 horas',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    title: 'Califica tu experiencia',
    message: '¿Cómo estuvo tu visita al Parque Nacional Aguaro-Guariquito?',
    type: 'rating',
    isRead: true,
    time: '1 día',
    image: 'https://randomuser.me/api/portraits/men/68.jpg'
  },
  {
    id: '4',
    title: 'Actualización de lugar',
    message: 'Se ha actualizado la información del Museo de los Llanos',
    type: 'update',
    isRead: true,
    time: '2 días',
    image: 'https://randomuser.me/api/portraits/women/65.jpg'
  },
  {
    id: '5',
    title: 'Nuevo comentario',
    message: 'Alguien ha respondido a tu comentario sobre Finca El Encanto',
    type: 'comment',
    isRead: true,
    time: '3 días',
    image: 'https://randomuser.me/api/portraits/men/43.jpg'
  }
];

// Iconos y colores para cada tipo de notificación
const NOTIFICATION_TYPES = {
  promo: { 
    icon: 'pricetag', 
    gradient: [Colors.ColorOnPrimary, Colors.ColorPrimary],
    bgColor: '#F2FAF5'
  },
  reminder: { 
    icon: 'alarm', 
    gradient: [Colors.ColorOnPrimary, Colors.ColorPrimary],
    bgColor: '#F2FAF5'
  },
  rating: { 
    icon: 'star', 
    gradient: [Colors.ColorOnPrimary, Colors.ColorPrimary],
    bgColor: '#F2FAF5'
  },
  update: { 
    icon: 'refresh-circle', 
    gradient: [Colors.ColorOnPrimary, Colors.ColorPrimary],
    bgColor: '#F2FAF5'
  },
  comment: { 
    icon: 'chatbubble', 
    gradient: [Colors.ColorOnPrimary, Colors.ColorPrimary],
    bgColor: '#F2FAF5'
  },
};

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start();
  }, []);

  const markAsRead = (id) => {
    setNotifications(notifications.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(item => ({ ...item, isRead: true })));
  };

  const deleteNotification = (id) => {
    // Aplicar animación de salida antes de eliminar
    const newNotifications = notifications.filter(item => item.id !== id);
    setNotifications(newNotifications);
  };

  const renderNotificationCard = ({ item, index }) => {
    const typeInfo = NOTIFICATION_TYPES[item.type] || NOTIFICATION_TYPES.update;
    
    return (
      <Animated.View 
        style={[
          styles.notificationCard,
          !item.isRead && { backgroundColor: typeInfo.bgColor },
          { 
            opacity: fadeAnim,
            transform: [{ 
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              }) 
            }] 
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.cardContent}
          onPress={() => markAsRead(item.id)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={typeInfo.gradient}
            style={styles.iconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={typeInfo.icon} size={20} color="#FFFFFF" />
          </LinearGradient>
          
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
            <Text style={styles.notificationMessage}>{item.message}</Text>
          </View>

          {!item.isRead && (
            <View style={[styles.newIndicator, { backgroundColor: Colors.ColorPrimary }]} />
          )}
        </TouchableOpacity>
        
        <View style={styles.cardActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => {
              markAsRead(item.id);
              // Aquí podrías navegar a la pantalla correspondiente
            }}
          >
            <Text style={[styles.viewButtonText, { color: Colors.ColorPrimary }]}>Ver</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteNotification(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={Colors.DarkGray} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="notifications-off" size={80} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>No tienes notificaciones</Text>
      <Text style={styles.emptyMessage}>
        Aquí verás actualizaciones importantes, promociones y más.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.ColorPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Notificaciones</Text>
        
        {notifications.some(n => !n.isRead) && (
          <TouchableOpacity 
            style={styles.readAllButton} 
            onPress={markAllAsRead}
          >
            <Text style={styles.readAllText}>Marcar como leídas</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationCard}
        keyExtractor={item => item.id}
        contentContainerStyle={
          notifications.length === 0 
            ? styles.emptyListContainer 
            : styles.notificationList
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.Black,
    flex: 1,
  },
  readAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  readAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: Colors.ColorPrimary,
  },
  notificationList: {
    padding: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    // Sombras más sutiles
    shadowColor: Colors.Black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: Colors.Black,
  },
  timeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.DarkGray,
  },
  notificationMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: Colors.Black,
    lineHeight: 18,
    opacity: 0.7,
  },
  newIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
    alignSelf: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  actionButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#F5F5F5',
  },
  deleteButton: {
    paddingHorizontal: 20,
  },
  viewButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.Black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.DarkGray,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 250,
  },
});

export default NotificationsScreen;
