import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from 'react-native-checkbox';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { db } from '../firebaseConfig';

const PrintTask = (props) => {
  const [checkStatus, checksetStatus] = useState(false);
  const [editTask, seteditTask] = useState(props.task);
  const [changeEdit, setchangeEdit] = useState(false);
  

  const cboxChange = () => {
    checksetStatus(!checkStatus);
  };

  const onEditTask = (event) => {
    seteditTask(event);
  };

  const changeEditoption = () => {
    if (!changeEdit) {
      setchangeEdit(true);
    } else {
      updataDB();
      setchangeEdit(false);
    }
  };

  const updataDB = async () => {
    try {
      await db.collection('Task').doc(props.index).update({
        addTask: editTask,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteDB = async () => {
    try {
      await db.collection('Task').doc(props.index).delete();
      props.delDB();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.taskView}>
      <View style={styles.checkBoxView}>
        <CheckBox checked={checkStatus} onChange={cboxChange} label="" />
      </View>
      <View style={styles.taskTextView}>
        <TextInput
          style={checkStatus ? styles.unselectCheck : styles.selectCheck}
          value={editTask}
          onChangeText={onEditTask}
          multiline={true}
          maxLength={30}
          editable={changeEdit}
        />
      </View>
      <View style={styles.iconView}>
        <TouchableOpacity onPress={changeEditoption}>
          <Feather name="edit" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteDB}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  taskView: {
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
  checkBoxView: {
    marginLeft: 15,
    marginRight: 10,
    marginTop: 5,
  },
  taskTextView: {
    flex: 1,
  },
  selectCheck: {
    fontSize: 20,
    color: 'black',
  },
  unselectCheck: {
    fontSize: 20,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  iconView: {
    flexDirection: 'row',
    marginRight: 10,
  },
});

export default PrintTask;