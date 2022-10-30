
import { View, Text, StyleSheet, Image } from 'react-native';


export function Memorias ({ titulo, descricao, localizacao, ano, fotoMemoria}){

 const iconeLocalizacao = 'https://www.imagensempng.com.br/wp-content/uploads/2021/09/05-2.png' 

return (

<View style={style.centralizador}>
<Image source={{uri:fotoMemoria}} style={style.fotoMemoria} /> 
  <Text style={style.titulo}>{titulo}</Text>
   <Text style={style.descricao}>{descricao}</Text>
   <View style= {style.alinhador}>
   <Image style= {style.iconeLocalizacao} source={{ uri: iconeLocalizacao }}/>
   <Text style={style.localizacao}>{ano}, </Text>
    <Text style={style.localizacao}>{localizacao}</Text>
      </View>
  </View>
  )  
}

const style = StyleSheet.create({
fotoMemoria: {
  width: 300,
  height: 200
},
iconeLocalizacao: {
height: 25,
width: 25
},
alinhador: {
  flexDirection: 'row'
},
titulo: {
  fontWeight: 'bold',
  fontSize: 20
},
localizacao: {
  color: '#9900cc'
},
centralizador: {
  margin: 30,
  borderWidth: 1,
  padding: 30
},
descricao: {
  width: 300
}

})
