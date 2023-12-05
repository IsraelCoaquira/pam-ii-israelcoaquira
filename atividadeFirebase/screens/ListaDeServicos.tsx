import { View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Dimensions, 
    SafeAreaView, 
    StatusBar,
    Modal, 
    Image,
   TextInput, 
   ScrollView} from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../config/firebaseconfig";
import { addDoc, collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { TextInputMask } from "react-native-masked-text";
import { AntDesign, MaterialIcons, Ionicons, Foundation } from "@expo/vector-icons";

export interface Produto {
nameproduto: string;
precoRS: string;
descricao: string;
id: string
}


const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const Listas = ({ navigation} : any) => {

const [produtos, setProdutos] = useState<Produto[]>([]);
const [produto, setProduto] = useState('');
const [cadNomeServico, setCadNomeServico] = useState('');
const [cadPrecoServico, setCadPrecoServico] = useState('');
const [cadDescServico, setCadDescServico] = useState('');
const [modalCadastro, setModalCadastro] = useState(false);

useEffect(() => {
   const produtoRef= collection(FIRESTORE_DB, 'produtos');

   const contagem = onSnapshot(produtoRef, {
       next: (snapshot) => {
           console.log('UPDATED');

           const produtos: Produto[] = [];
           snapshot.docs.forEach((doc) =>{
               produtos.push({
                   id: doc.id,
                   ...doc.data(),
               }as Produto);
               });
               setProdutos(produtos);
           },
       });
       return () => contagem()
}, []);

const adicionarItem = async () =>{
   const doc = await addDoc(collection(FIRESTORE_DB, 'produtos'), 
   { nomeProduto: cadNomeServico, precoRS: cadPrecoServico, descricao: cadDescServico})
   setModalCadastro(false)
   setCadNomeServico('');
   setCadPrecoServico('')
   setCadDescServico('')
};

const renderProduto = ({item}: any) =>{
   
   const ref = doc(FIRESTORE_DB, `produtos/${item.id}`);

   const deleteProduto = async () => {
       deleteDoc(ref)
   };

   return(
       <View style={{
           height: SCREEN_HEIGHT*0.76,
           width: SCREEN_WIDTH,
           //marginBottom: 1,
           //justifyContent: 'center',
           position: 'relative',
           }}>
            <View style={{height: SCREEN_HEIGHT*0.55, 
        alignSelf: 'center', 
        width: SCREEN_WIDTH*0.125, 
        backgroundColor: "#40445e",
        position:'absolute',
        marginTop: SCREEN_HEIGHT*0.21,
      }}></View>
       <View style={styles.itemLista}>
       <Foundation name="plus" style={styles.logo}/>
       </View>
       <View style={{
         backgroundColor: 'transparent',
         height: SCREEN_HEIGHT*0.08,
         width: SCREEN_WIDTH*0.18,
         alignItems: 'center',
         marginTop: SCREEN_HEIGHT*0.05,
         justifyContent: 'center',
         alignSelf: 'center'
       }}>
         <Ionicons name="trash-outline" onPress={deleteProduto} 
               style={{
                   fontSize: SCREEN_WIDTH*0.125, 
                   textAlignVertical: 'center', 
                   position: 'absolute',
                   //marginLeft: SCREEN_WIDTH*0.475,
                   //marginTop: SCREEN_HEIGHT*0.01,
                   backgroundColor: "#ff9898",
                   paddingHorizontal: SCREEN_WIDTH*0.025,
                   paddingVertical: SCREEN_HEIGHT*0.0075,
                   borderColor: "#e03b3b",
                   textAlign: 'center',
                   borderRadius: SCREEN_WIDTH*0.08,
                   borderWidth: SCREEN_WIDTH*0.01,
                   color: "#e03b3b" }}/>
         </View>       
       <View style={{
         marginTop: SCREEN_HEIGHT*0.135,
         height: SCREEN_HEIGHT*0.175, 
         alignSelf: 'center', 
         width: SCREEN_WIDTH*0.5, 
         borderRadius: SCREEN_WIDTH*0.1,
         backgroundColor: "#0c9164",
        //position:'absolute'
      }}>
       <View style={styles.PacoteTxt}>
               <View>
               <Text style={[styles.txtProdutos, 
                {fontWeight: 'bold', fontSize: SCREEN_WIDTH*0.04}]}>{item.nomeProduto}</Text>
               <Text style={styles.txtProdutos}>{item.precoRS}</Text>
               <Text style={styles.txtProdutos}>{item.descricao}</Text>
               </View>
           </View>
           </View>
       </View>
   )
}
return(
   <SafeAreaView style={styles.container}>
       <View style={styles.container2}>
       <Image source={require("../assets/images/medback.png")} style={{position: 'absolute', height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}/>
       <Modal visible={modalCadastro} animationType="fade">
           <View style={styles.container2}>
               <View style={styles.bgCima}>
               <Image style={styles.imgPets}source={require("../assets/images/meds.png")}/>
                   <View style={[styles.bgTituloModal,{flexDirection: "row", marginTop: SCREEN_HEIGHT*0.01}]}>
                       <TouchableOpacity onPress={() => setModalCadastro(false)}>
                           <AntDesign name="left" style={{fontSize: SCREEN_WIDTH*0.1, 
                                       fontWeight: 'bold', 
                                       marginTop: SCREEN_HEIGHT*0.01,
                                       color: '#18bd86'}}/>
                       </TouchableOpacity>
                       <View style={{}}>
                           <Text style = {styles.tituloModal}>CADASTROS</Text>
                           <Text style = {{color: '#18bd86' , fontWeight: 'bold', marginLeft: SCREEN_WIDTH*0.05}}>Cadastre aqui um produto ou serviço</Text>
                       </View>
                   </View>
               </View>
               <ScrollView style={styles.bgBaixo}>
                   <View style={styles.viewBaixo}>
                   <Text style={styles.textUPInput}>NOME: </Text>
                       <TextInput 
                           style={styles.inputNome} 
                           placeholder="Digite um nome para o serviço"
                           onChangeText={ text => setCadNomeServico(text)}/>
                   <Text style={styles.textUPInput}>PREÇO: </Text>
                   <TextInputMask style={styles.inputMoney} type="money" options={{
                       precision: 2,
                       separator: ',',
                       delimiter: '.',
                       unit: 'R$',
                       suffixUnit: ''
                       }} 
                       onChangeText={ text => setCadPrecoServico(text)}
                       placeholder="Digite um preço para o serviço"/>
                   <Text style={styles.textUPInput}>DESCRIÇÃO: </Text>
                       <TextInput 
                           style={styles.inputDesc} 
                           onChangeText={ text => setCadDescServico(text)}
                           placeholder="Digite uma descrição para o serviço"/>
                   </View>
                   <TouchableOpacity 
                       style={styles.btnCadastrar} 
                       onPress={adicionarItem } 
                       disabled={cadNomeServico=='' || cadPrecoServico=='' || cadDescServico==''}>
                       <Text style={styles.txtCadastrar}>Cadastrar produto</Text>
                   </TouchableOpacity>
               </ScrollView>
           </View>
       </Modal>
       <View style={styles.viewTitulo}>
           <MaterialIcons name="local-hospital" style={styles.titulo}/>
           <Text style={styles.titulo}> +SAÚDE CLÍNICAS </Text>
           <MaterialIcons name="local-hospital" style={styles.titulo}/>
       </View>
       <FlatList
       horizontal
       pagingEnabled
       data={produtos}
       renderItem={(item) => renderProduto(item)}
       keyExtractor={(produto: Produto) => produto.id}
       />
       <TouchableOpacity style={styles.abrirModal} onPress={() => setModalCadastro(true)}>
           <Text style={styles.txtbtnAbrirModal}>Cadastre um novo produto</Text>
       </TouchableOpacity>
       </View>
   </SafeAreaView>
)
}
const styles = StyleSheet.create({
    //<View style={styles.prateleira}/>
container: {
   paddingTop: StatusBar.currentHeight,
   backgroundColor: "#f0f0f0",
   flex: 1,
},
container2: {
   backgroundColor: "#ffd2fd",
   flex: 1,
}, 
modal:{
   backgroundColor: '#da8282'
},
prateleira:{
   backgroundColor: "#bf6646",
   height: SCREEN_HEIGHT*0.04,
   width: SCREEN_WIDTH*0.9,
   alignSelf: 'center'
},
PacoteTxt:{
   //borderWidth: SCREEN_WIDTH*0.01,
   //height: SCREEN_HEIGHT*0.1,
   width: SCREEN_WIDTH*0.45,
   justifyContent: 'center',
   alignSelf: "center",
   textAlignVertical: 'center',
   alignItems: 'center',
   paddingTop: SCREEN_HEIGHT*0.01
},
logo:{
   fontSize: SCREEN_WIDTH*0.5,
   color: "#0eb47d",
   textAlign: 'center',
   textAlignVertical: "center",
   alignSelf: 'center',
   //marginTop: SCREEN_HEIGHT*0.09,
},
viewTitulo:{
   marginTop: SCREEN_HEIGHT*0.03,
   marginBottom: SCREEN_HEIGHT*0.03,
   alignSelf: 'center',
   justifyContent: 'center',
   backgroundColor: "#b3ded5",
   borderRadius: SCREEN_WIDTH*0.05,
   borderWidth: SCREEN_WIDTH*0.01,
   borderColor: '#48ac96',
   width: SCREEN_WIDTH*0.8,
   height: SCREEN_HEIGHT*0.075,
   flexDirection: 'row'
},
titulo:{
   fontSize: SCREEN_WIDTH*0.055,
   textAlign: 'center',
   textAlignVertical: 'center',
   fontWeight: 'bold',
   color: '#48ac96',
},
bgCima:{
   height: SCREEN_HEIGHT*0.5,
   backgroundColor: '#befaed'
},
bgBaixo:{
   backgroundColor: "#d6fff6"    
},
viewBaixo:{
},
imgPets:{
   position: 'absolute',
   height: SCREEN_HEIGHT*0.365,
   width: SCREEN_WIDTH*0.95,
   marginTop: SCREEN_WIDTH*0.2,
   alignSelf: 'center'
},
bgTituloModal: {
   marginHorizontal: SCREEN_WIDTH*0.05
},
txtProdutos:{
   fontSize: SCREEN_WIDTH*0.0275,
   color: '#ffe4b3',
   textAlignVertical: 'center',
   //textAlign: 'center'
   width: SCREEN_WIDTH*0.4
},
itemLista:{
   //marginTop: SCREEN_HEIGHT*0.06,
   width: SCREEN_WIDTH*0.7,
   alignSelf: 'center',
   justifyContent: 'center',
   height: SCREEN_WIDTH*0.7,
   backgroundColor:"#c6ffec",
   borderWidth: SCREEN_WIDTH*0.06,
   borderColor: "#0eb47d",
   borderRadius: SCREEN_WIDTH*0.4
},
txtDescProduto:{
   backgroundColor: "#fce8b0",
   height: SCREEN_HEIGHT*0.05,
   width: SCREEN_WIDTH*0.25,
   //alignSelf: 'center',
   borderWidth: SCREEN_WIDTH*0.005,
   borderRadius: SCREEN_WIDTH*0.02,
   borderColor: "#18bd86"
},
tituloModal:{
   fontWeight: 'bold',
   fontSize: SCREEN_WIDTH*0.08,
   color: '#0e9e6e',
   marginLeft: SCREEN_WIDTH*0.125,
},
inputNome:{
   //backgroundColor: 'red',
   width: SCREEN_WIDTH*0.85,
   color: '#818181',
   height: SCREEN_HEIGHT*0.04,
   paddingTop: SCREEN_HEIGHT*0.01,
   borderBottomWidth: 1,
   alignSelf: 'center',
   borderBottomColor: "#818181"
},
inputMoney:{
   //backgroundColor: 'red',
   width: SCREEN_WIDTH*0.85,
   color: '#818181',
   height: SCREEN_HEIGHT*0.04,
   paddingTop: SCREEN_HEIGHT*0.01,
   borderBottomWidth: 1,
   alignSelf: 'center',
   borderBottomColor: "#818181"
},
inputDesc:{
   //backgroundColor: 'red',
   width: SCREEN_WIDTH*0.85,
   color: '#818181',
   height: SCREEN_HEIGHT*0.04,
   paddingTop: SCREEN_HEIGHT*0.01,
   borderBottomWidth: 1,
   alignSelf: 'center',
   borderBottomColor: "#818181"
},
textUPInput:{
   marginHorizontal: SCREEN_WIDTH*0.075,
   marginTop: SCREEN_HEIGHT*0.04,
   color: "#818181"
},
abrirModal:{
   marginTop: SCREEN_HEIGHT*0,
   backgroundColor: "#0a6652",
   alignSelf: 'center',
   justifyContent: 'center',
   height: SCREEN_HEIGHT*0.125,
   width: SCREEN_WIDTH
},
txtbtnAbrirModal:{
   fontSize: SCREEN_WIDTH*0.055,
   fontWeight: 'bold',
   textAlign: 'center',
   textAlignVertical: 'center',
   color: '#48ac96',
   backgroundColor: "#b3ded5",
   width: SCREEN_WIDTH*0.75,
   borderRadius: SCREEN_WIDTH*0.06,
   borderWidth: SCREEN_WIDTH*0.01,
   borderColor: "#48ac96",
   height: SCREEN_HEIGHT*0.075,
   alignSelf: 'center'
},
btnCadastrar:{
   marginTop: SCREEN_HEIGHT*0.05,
   alignSelf: 'center',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: "#48ac96",
   height: SCREEN_HEIGHT*0.1,
   width: SCREEN_WIDTH*0.8,
   borderRadius: SCREEN_WIDTH*0.06
},
txtCadastrar:{
   fontSize: SCREEN_WIDTH*0.05,
   fontWeight: 'bold',
   color: '#fff'
},
})
export default Listas