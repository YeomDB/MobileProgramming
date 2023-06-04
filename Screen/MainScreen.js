import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useEffect } from 'react';
import PrintTask from '../components/PrintTask';
import { useState } from 'react';
import { db } from '../firebaseConfig';

const MainScreen = () => {

  const [myTask, setmyTask] = useState('');
  const [taskList, settaskList] = useState([]);
  const [control, setControl] = useState([]);

  const onChangeInput = (event) => {
    setmyTask(event);
  };

  const onAddTextInput = () => {
    settaskList([...taskList, myTask]);
    setmyTask("");
  };

const addtoDB = async () => {
  const currentDate = new Date()
  const month = currentDate.getMonth() + 1
  const day = currentDate.getDate()
  const year = currentDate.getFullYear()
  try {
    const docRef = await db.collection('Task').doc();
    await docRef.set({
      addTask: myTask,
      createdAt : new Date(),
      Month : month,
      Day : day,
      Year : year,
    });
  } catch (error) {
    console.log(error.message);
  }
  readfromDB()
};

const readfromDB = async () => {
  try {
    const data = await db.collection('Task').orderBy('createdAt', 'asc').get();
    let tempArray = [];
    data.forEach((doc) => {
      const { addTask } = doc.data();
      const docId = doc.id
      tempArray.push({ addTask, docId });
    });
    const addTasks = tempArray.map((row) => row.addTask);
    const docids = tempArray.map((row) => row.docId);
    settaskList(addTasks);
    setControl(docids)
  } catch (error) {
    console.log(error.message);
  }
};

  useEffect(() => {
    readfromDB();
  }, []);

  return(
    <View style={styles.mainView}>
      <View style={styles.titleView}>
        <Text style={styles.titleFont}>To-Do List</Text>
      </View>
      <View>
        <ScrollView>
          {taskList.map((item, idx) => {
            return <PrintTask
             key = {control[idx]}
             task={item} 
             index={control[idx]} 
             delDB = {readfromDB}
             control={control}
             setControl={setControl}
             />
          })}
        </ScrollView>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          value={myTask}
          onChangeText={onChangeInput}
          multiline={true}
          maxLength={30}
          editable={true}
          placeholder="+ Add Task"
        />
        <TouchableOpacity
          onPress={() => {
            addtoDB()
            onAddTextInput();
          }}>
          <View style={styles.btnshape}>
            <Text> + </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'rgb(214,230,243)',
  },
  titleView: {
    paddingTop: 35,
  },
  titleFont: {
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'rgb(122,171,255)',
  },
  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 40,
    width: 275,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 20,
  },
  inputView: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnshape: {
    backgroundColor: '#3498db',
    marginLeft: 20,
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default MainScreen