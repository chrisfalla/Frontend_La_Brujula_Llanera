import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors, TextStyles, GlobalStyles } from '../../styles/styles';
import NavigationTopBar from '../../components/NavigationTopBar/NavigationTopBar';
import CustomButton from '../../components/CustomButton/CustomButton';
import { getTermsAndConditionsUrlUseCase } from '../../../domain/usecases/termsAndConditions/getTermsAndConditionsUrlUseCase';

const TermsCondition = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleViewMore = () => {
    setLoading(true);
    setError(null);
    
    getTermsAndConditionsUrlUseCase()
      .then(url => {
        if (url) {
          // Solo abrir si hay url
          return Linking.openURL(url);
        } else {
          setError('No se pudo abrir el enlace. Intenta nuevamente.');
        }
      })
      .catch(() => {
        setError('No se pudo abrir el enlace. Intenta nuevamente.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      <NavigationTopBar
        primaryIcon="chevron-back"
        onBackPress={handleBackPress}
        title="Términos y Condiciones"
        useBackground={false}
        SecondIcon={false}
      />

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionText}>
            <Text style={styles.sectionTitle}>Uso de los Servicios:{"\n"}</Text>
            Nuestros servicios están disponibles solo para personas de 18 años o más. Al usarlos, aceptas la responsabilidad de cumplir con las leyes locales, especialmente si accedes desde fuera de Colombia, donde están alojados nuestros servicios.{"\n\n"}
            <Text style={styles.sectionTitle}>Propiedad Intelectual:{"\n"}</Text>
            Somos los propietarios de todo el contenido (textos, imágenes, código, etc.) y las marcas (logotipos) en nuestros servicios. Te damos una licencia limitada para usar este contenido solo para fines personales o comerciales internos. No puedes copiarlo, reproducirlo ni usarlo comercialmente sin nuestro permiso explícito. Si violas estos derechos, tu acceso será terminado.{"\n\n"}
            <Text style={styles.sectionTitle}>Tus Contribuciones:{"\n"}</Text>
            Cualquier idea, sugerencia o contenido que envíes (como comentarios o reseñas) nos otorga una licencia ilimitada para usarlo y distribuirlo para cualquier fin, incluyendo publicidad. Tú eres el único responsable de que tu contenido sea legal, veraz y no infrinja los derechos de otros. Nos reservamos el derecho de editar o eliminar tus contribuciones si es necesario.{"\n\n"}
            <Text style={styles.sectionTitle}>Actividades Prohibidas:{"\n"}</Text>
            No puedes usar nuestros servicios para fines ilegales o no autorizados. Esto incluye fraudes, acoso, cargar software malicioso, recopilar datos masivamente, suplantar identidades, interferir con el servicio o cualquier uso que compita con nosotros.{"\n\n"}
            <Text style={styles.sectionTitle}>Contenido de Terceros:{"\n"}</Text>
            Nuestros servicios pueden incluir enlaces o contenido de terceros. No somos responsables por su veracidad o seguridad; accedes a ellos bajo tu propio riesgo.{"\n\n"}
            <Text style={styles.sectionTitle}>Gestión y Terminación del Servicio:{"\n"}</Text>
            Podemos monitorear el cumplimiento de estas reglas y tomar acciones legales contra quienes las infrinjan. Tenemos la facultad de restringir o terminar tu acceso a los servicios o eliminar tu cuenta en cualquier momento si incumples estos términos.{"\n\n"}
            <Text style={styles.sectionTitle}>Privacidad:{"\n"}</Text>
            Tu privacidad es importante. Al usar nuestros servicios, aceptas nuestra Política de Privacidad y consientes que tus datos sean transferidos y procesados en Colombia. No recopilamos información de niños menores de 13 años.{"\n\n"}
            <Text style={styles.sectionTitle}>Ley Aplicable:{"\n"}</Text>
            Estos términos se rigen por las leyes de Colombia.
          </Text>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          <CustomButton
            style={styles.button}
            titletext="Ver Términos Completos"
            type="Primary"
            size="Big"
            onPress={handleViewMore}
            IsDisabled={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BackgroundPage,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryTitle: {
    ...TextStyles.PoppinsBold15,
    color: Colors.ColorPrimary,
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    ...TextStyles.PoppinsSemiBold15,
    color: Colors.ColorPrimary,
  },
  sectionText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.DarkGray,
    textAlign: 'justify',
    lineHeight: 22,
  },
  button: {
    marginTop: 30,
    alignSelf: 'center',
  },
  errorText: {
    ...TextStyles.PoppinsRegular15,
    color: Colors.ErrorAdvertisingColor,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default TermsCondition;