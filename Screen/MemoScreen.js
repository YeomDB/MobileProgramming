import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'

const MemoScreen = ({navigation}) => {
  const [readtitle, setReadTitle] = useState([])
  const [control, setControl] = useState('')

  const changeScreen = () => {
    navigation.navigate('Write');
  };

  const readMemoDB = async() => {
  try {
    const data = await db.collection('Memo').get();
    const tempArray = [];
    data.forEach((doc) => {
      const { Title, Index } = doc.data();
      tempArray.push({ Title, Index });
    });
    const getTitle = tempArray.map((row) => row.Title);
    const getIndex = tempArray.map((row) => row.Index);
    setReadTitle(getTitle);
    setControl(getIndex);
  } catch (error) {
    console.log(error.message);
  }
  readMemoDB()
  }

  const handleMemoPress = (ctrl) => {
    navigation.navigate('Detail', { ctrlID: ctrl });
  };

  useEffect(() => {
    readMemoDB();
  }, []);

  return (
    <View style={styles.memoView}>
        <ScrollView>
          {readtitle.map((input, index) => (
          <TouchableOpacity 
            onPress={()=> {handleMemoPress(control[index])}}
            key={index}
          ><View style = {styles.titleView}>
            <Text style = {{fontSize : 20, marginLeft : 10}}>{input}</Text>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
      <TouchableOpacity style={styles.btnView} onPress={changeScreen}>
        <View style={styles.btnShape}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  memoView: {
    flex: 1,
    backgroundColor: 'rgb(214,230,243)',
  },
  titleView: {
    backgroundColor: 'white',
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 22,
    marginLeft: 20,
    marginRight: 20,
  },
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  btnShape: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'skyblue',
  },
});

export default MemoScreen;
