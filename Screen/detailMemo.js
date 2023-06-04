import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'

const detailMemo = ({ route, navigation }) => {
  const { ctrlID } = route.params;
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [control, setControl] = useState('')
 
  const handleAddtitle = (event) => {
    setTitle(event);
  };

  const handleAddContent = (event) => {
    setContent(event);
  };

  const changeScreen = () => {
    navigation.navigate('Memo');
  }

  const UpdateMemo = async () => {
    try {
      await db.collection('Memo').doc(ctrlID).update({
        Title: title,
        Content : content,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteMemo = async () => {
    try {
      await db.collection('Memo').doc(ctrlID).delete();
    } catch (error) {
      console.log(error.message);
    }
  };

  const readMemo = async () => {
    try {
      const doc = await db.collection('Memo').doc(ctrlID).get();
      const data = doc.data();
      const { Title, Content, Index } = data;
      const titles = Title;
      const contents = Content;
      const indexs = Index;
      setTitle(titles);
      setContent(contents);
      setControl(indexs)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    readMemo();
  }, []);

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
            style = {styles.btnDContainer}
            onPress = {()=> {
              deleteMemo()
              changeScreen()
            }}
          >
            <Text>삭제</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.btnContainer}
            onPress = {()=> {
              UpdateMemo()
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
  btnDContainer: {
    position: 'absolute',
    bottom: 20,
    right: 85,
    backgroundColor: 'skyblue',
    borderRadius: 30,
    padding: 10,
  },
});

export default detailMemo