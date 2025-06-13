import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, Colors, TextStyles } from '../../styles/styles';

// Componente para cada notificación individual
const NotificationItem = ({ notification, onPress }) => {
  const getIconByType = (type) => {
    switch (type) {
      case 'info':
        return 'information-circle-outline';
      case 'success':
        return 'checkmark-circle-outline';
      case 'warning':
        return 'warning-outline';
      case 'error':
        return 'alert-circle-outline';
      case 'promo':
        return 'pricetag-outline';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
      onPress={() => onPress(notification.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconByType(notification.type)}
          size={24}
          color={Colors.ColorPrimary}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationBody}>{notification.body}</Text>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      {!notification.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
};

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función para cargar notificaciones (simulada para este ejemplo)
  const loadNotifications = () => {
    setLoading(true);
    // Simulamos una carga de datos con un timeout
    setTimeout(() => {
      const mockNotifications = [
        {
          id: '1',
          title: 'Bienvenido a La Brújula Llanera',
          body: '¡Gracias por unirte a nuestra aplicación! Descubre los mejores lugares en los llanos.',
          time: 'Hoy, 10:30 AM',
          read: false,
          type: 'info'
        },
        {
          id: '2',
          title: 'Nueva reseña en tu lugar favorito',
          body: 'Un usuario ha dejado una nueva reseña en "Hato Santa Luisa".',
          time: 'Ayer, 3:45 PM',
          read: true,
          type: 'success'
        },
        {
          id: '3',
          title: 'Descuento especial este fin de semana',
          body: 'Obtén un 15% de descuento en "Posada El Alcaraván" mostrando la app.',
          time: '12 Jun, 2:00 PM',
          read: false,
          type: 'promo'
        },
        {
          id: '4',
          title: 'Actualización de la aplicación',
          body: 'Hemos mejorado la experiencia con nuevas funcionalidades. ¡Explóralas ahora!',
          time: '10 Jun, 9:15 AM',
          read: true,
          type: 'info'
        },
        {
          id: '5',
          title: 'Evento: Festival del Joropo',
          body: 'No te pierdas el Festival del Joropo este fin de semana en Villavicencio.',
          time: '8 Jun, 11:20 AM',
          read: true,
          type: 'info'
        }
      ];
      
      setNotifications(mockNotifications);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  // Cargar notificaciones al montar el componente
  useEffect(() => {
    loadNotifications();
  }, []);

  // Función para manejar la acción de refrescar
  const handleRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  // Función para marcar una notificación como leída
  const handleNotificationPress = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    // Aquí podrías agregar lógica para navegar a una pantalla específica según el tipo de notificación
  };

  // Función para marcar todas las notificaciones como leídas
  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  // Contamos las notificaciones no leídas
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.ColorPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.readAllButton}
            onPress={markAllAsRead}
          >
            <Text style={styles.readAllText}>Marcar todas como leídas</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.ColorPrimary} />
          <Text style={styles.loadingText}>Cargando notificaciones...</Text>
        </View>
      ) : notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onPress={handleNotificationPress}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={64}
            color={Colors.DarkGray}
          />
          <Text style={styles.emptyText}>No tienes notificaciones</Text>
          <Text style={styles.emptySubtext}>
            Las notificaciones sobre lugares, eventos y actualizaciones aparecerán aquí.
          </Text>
        </View>
      )}
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    ...TextStyles.PoppinsSemiBold15,
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
  },
  readAllButton: {
    padding: 8,
  },
  readAllText: {
    ...TextStyles.PoppinsRegular12,
    color: Colors.ColorPrimary,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.White,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#F0F9FF', // Un tono azul claro para las no leídas
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.LightGray,
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    ...TextStyles.PoppinsSemiBold15,
    marginBottom: 4,
  },
  notificationBody: {
    ...TextStyles.PoppinsRegular12,
    color: Colors.DarkGray,
    marginBottom: 8,
  },
  notificationTime: {
    ...TextStyles.PoppinsRegular10,
    color: Colors.Gray,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.ColorPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    marginTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    ...TextStyles.PoppinsSemiBold15,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    ...TextStyles.PoppinsRegular12,
    color: Colors.DarkGray,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
