import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Vibration,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';



export function IncluirMemoriaScreen({ navigation }) {
 //Objetos que vão interligar os objetos da tela de memórias
  const [memoria, setMemoria] = useState({
    fotoMemoria: null,
    titulo: null,
    ano: null,
    descricao: null,
    localizacao: null,
  });

//Função do botão onde abre os arquivos do dispositivo
  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      qualiy: 1,
    });
//Se ele for escolhido, ele mostra na tela e envia o objeto para tela de memórias
    if (!result.cancelled) {
      setFoto(result.uri);
      setMemoria({ ...memoria, fotoMemoria: result.uri });
      console.log(result.uri);
    }
  };

  //Objeto da foto da memória que será inserido
  const [fotoMemoria, setFoto] = useState(null);

//Icone rrepresentativo de uma câmera
  const iconeFoto =
    'https://www.freeiconspng.com/uploads/photo-album-icon-png-14.png';

//Função que puxa alocalização do dispositivo
  buscarLocalizacao = async () => {
    //Pede permissão da localização
    let { status } = await Location.requestForegroundPermissionsAsync();

//Se ela for diferente de qualquer aceitação mostra uma mensagem ao usuário
    if (status !== 'granted') {
      alert('Permissão da localização negada');
      return;
    } else {
      // Pega as coordenadas do dispositivo transformando em latitude e longitude
      const { coords } = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

//Encontra as coordenas no mapa geográfico 
      let response = await Location.reverseGeocodeAsync({
        longitude,
        latitude,
      });
//Pesquisa a localização, deixa disponível pro navegador para ser manipulado e altera  o objeto na tela de memórias
      response.forEach((item) => {
        setMemoria({ ...memoria, localizacao: item.subregion });
      });
    }
  };
  
//A localização é buscada assim que abre a tela de incluir memórias
  useEffect(() => {
    buscarLocalizacao();
  }, []);


// Função do botõa que salva e envia todos os objetos para a tela de memórias
  async function adicionarMemoria ()  {
  const salvamento =  await AsyncStorage.getItem('@memoria')
  const dadoAntigo = salvamento ? JSON.parse(salvamento) : []
  const dadoAtual = [...dadoAntigo, memoria]

  await AsyncStorage.setItem('@memoria', JSON.stringify(dadoAtual))

    Vibration.vibrate();
    navigation.navigate('Memórias', { memoria });
    console.log('salvou');
  };

    const apagarTudo = async () => {
    await AsyncStorage.clear();
    console.log('apagou')
  };

  

  return (
    <View style={style.container}>
      <View style={style.centralizador}>
        <TextInput
          placeholder="Título"
          style={style.inputs}
          onChangeText={(titulo) => setMemoria({ ...memoria, titulo: titulo })}
        />
        <TextInput
          placeholder="Quando aconteceu? (ano)"
          style={style.inputs}
          onChangeText={(ano) => setMemoria({ ...memoria, ano: ano })}
        />
        <TextInput
          style={style.inputs}
          placeholder='Sua localização'
          onChangeText={(localizacao) =>
            setMemoria({ ...memoria, localizacao: localizacao })
          }
          value={memoria.localizacao}
        />
        <TextInput
          placeholder="Conte sobre sua memória"
          style={style.inputs}
          onChangeText={(descricao) =>
            setMemoria({ ...memoria, descricao: descricao })
          }
        />
      </View>

      <TouchableOpacity style={style.botaoImagem} onPress={escolherImagem}>
        <Image style={style.iconeFoto} source={{ uri: iconeFoto }} />

        <Text style={style.textFoto}>Adicionar foto</Text>
      </TouchableOpacity>
      {fotoMemoria && (
        <Image source={{ uri: fotoMemoria }} style={style.fotoMemoria} />
      )}

      <View style={style.centralizador}>
        <TouchableOpacity style={style.botMemoria} onPress={adicionarMemoria}>
          <Text style={style.textMemorias}>Incluir Memória</Text>
        </TouchableOpacity>

       
        <TouchableOpacity style={style.botMemoria} onPress={apagarTudo}>
          <Text style={style.textMemorias}>Apagar Tudo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  inputs: {
    borderColor: '#00000',
    borderWidth: 1,
    marginTop: 30,
    backgroundColor: '#d3d3d3',
    width: 350,
  },
  iconeFoto: {
    height: 25,
    width: 25,
    tintColor: '#0000ff',
  },
  textFoto: {
    color: '#0000ff',
  },
  centralizador: {
    alignItems: 'center',
  },
  botaoImagem: {
    flexDirection: 'row',
    marginTop: 30,
  },
  container: {
    alignSelf: 'center',
  },
  fotoMemoria: {
    width: 300,
    height: 200,
  },
  botMemoria: {
    backgroundColor: '#9900cc',
    width: 350,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  textMemorias: {
    color: '#ffff',
    fontSize: 20,
  },
});
