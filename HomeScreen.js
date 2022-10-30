import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  ScrollView} from 'react-native';
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Memorias } from '../componentes/Memorias'
import AsyncStorage from '@react-native-async-storage/async-storage';

  
export function HomeScreen ({navigation}) {

  const [memoria, setMemoria] = useState([{
    fotoMemoria: null,
    titulo: null,
    ano: null,
    descricao: null,
    localizacao: null,
  }]);

  async function buscarMemoria ()  {
const salvamento =  await AsyncStorage.getItem('@memoria')  
  const dadoAntigo = salvamento ? JSON.parse(salvamento) : []
  setMemoria(dadoAntigo)

    console.log(memoria)
  }
 useFocusEffect(
   useCallback(()=> {
     buscarMemoria()
   }, [] )
 )
  
  
  return(
<ScrollView style={style.responsividade}>
<View style={style.centralizador}>

    <FlatList
        data={memoria}
        renderItem={({ item }) => (
         
<Memorias 
fotoMemoria= {item.fotoMemoria}
titulo= {item.titulo}
descricao= {item.descricao}
localizacao= {item.localizacao}
ano= {item.ano}
/>
)}
/>

<TouchableOpacity style={style.botMemoria} onPress = {() => navigation.navigate ('Incluir novas memórias')}>
<Text style={style.textMemorias}>Adicionar Memórias</Text>
</TouchableOpacity>
   </View>
</ScrollView>
   
  )
}

const style = StyleSheet.create({
  botMemoria: {
    backgroundColor: '#9900cc',
    width: 350,
    borderRadius: 5,
    alignItems: 'center'
  },
  textMemorias: {
    color: '#ffff',
    fontSize: 20
  },
  centralizador: {
    alignItems: 'center',
    marginBottom: 30
  }

})
