import { fonts } from './fontsTheme';  // Importa las fuentes definidas
import { Colors } from './ColorsTheme';  // Importa los colores definidos

export const textStyles = {
heading1: {
    fontFamily: fonts.family.semiBold,  // Usa la fuente semiBold
    fontSize: fonts.size.heading1,      // Tamaño de fuente definido para el título
    lineHeight: fonts.lineHeight.heading1, // Altura de línea definida para encabezados
    color: Colors.Black,  // Color del texto (negro)
},

label: {
    fontFamily: fonts.family.extraBold,
    fontSize: fonts.size.label,
    lineHeight: fonts.lineHeight.label,
    color: Colors.Black,
},

body: {
    fontFamily: fonts.family.regular,
    fontSize: fonts.size.body,
    lineHeight: fonts.lineHeight.body,
    color: Colors.Black,
},
};
