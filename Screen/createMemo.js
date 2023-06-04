import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { db } from '../firebaseConfig'


const createMemo = ({navigation}) => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleAddtitle = (event) => {
    setTitle(event);
  };

  const handleAddContent = (event) => {
    setContent(event);
  };

  const changeScreen = () => {
    navigation.navigate('Memo');
  }

  const addMemo = async () => {
    try {
      const docRef = await db.collection('Memo').doc();
      await docRef.set({
        Title: title,
        Content: content,
        Index : docRef.id
      });
    } catch (error) {
      console.log(error.message);
    }
    reRenderDB()
  };

  const reRenderDB = async() => {
  try {
    const data = await db.collection('Memo').get();
    const tempArray = [];
    data.forEach((doc) => {
      const { Title, Index } = doc.data();
      tempArray.push({ Title, Index });
    });
    const getTitle = tempArray.map((row) => row.Title);
    const getIndex = tempArray.map((row) => row.Index);
  } catch (error) {
    console.log(error.message);
  }
  }

 return (
    <View style={styles.container}>
        <View>
          <TextInput
            style={styles.inputTitle}
            placeholder="Title"
            value={title}
            onChangeText={handleAddtitle}
          />
        </View>
        <ScrollView scrollEnabled={false}>
        <View>
          <TextInput
            style={styles.inputContent}
            placeholder="Content"
            value={content}
            multiline = {true}
            onChangeText={handleAddContent}
            textAlignVertical="top"
          />
        </View>
        </ScrollView>
        <View>
          <TouchableOpacity
            style = {styles.btnContainer}
            onPress = {()=> {
              addMemo()
              changeScreen()
            }}
          >
            <Text>완료</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputTitle: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderColor: 'transparent',
    fontSize : 25
  },
  inputContent: {
    height: 500,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize : 15,
    borderColor: 'transparent',
  },
  btnContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    padding: 10,
  },
});

export default createMemo