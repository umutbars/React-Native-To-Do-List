import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { TodosContext } from './TodosContext'
import { SwipeListView } from 'react-native-swipe-list-view'
import uuid from 'uuid-random'
import { FontAwesome5 } from '@expo/vector-icons'

const Lineargraident = require("expo-linear-gradient").LinearGradient;

const TodoList = () => {
    const { state, dispatch } = useContext(TodosContext);
    const [todoText, setTodoText ] = useState('')
    const [editMode, setEditMode] = useState(false)
    const [editTodo, setEditTodo] = useState(null)
    const buttonTitle = editMode ? "edit" : "add";

    const handleSubmit = () => {
        if(editMode){
            dispatch({type: 'edit', payload:{...editTodo, text:todoText}})
            setEditMode(false)
            setEditTodo(null)
        }
        else{
            const newTodo = {id: uuid(), text: todoText};
            dispatch({type: 'add', payload:{...newTodo}})
        }
        setTodoText('') //yeni bir todo ekledikten sonra alanı temizle
    }

    const renderItem = (data) => {
        <Box 
            bg={{
                linearGradient: {
                    color:["lightblue.300", "violet.800"],
                    start:[0,0,0],
                    end:[1,0]
                }
            }}
            p='12'
            rounded='x1'
            _text={{
                fontSize: "md",
                fontWeight: "medium",
                color: "warmGray.50",
                textAlign: "center",
            }}
        >
            {data.item.text}
        </Box>
    };

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity onPress={() => editRow(data.item, rowMap)}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backRightbtn} onPress={() => deleteRow(data.item)}>
                <Text styles={{color:'#FFF'}}>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    const deleteRow = (todo) => {
        dispatch({type: 'delete', payload:todo});
    };

    const editRow = (todo, rowMap) => {
        setTodoText(todo.text);
        setEditMode(true);
        setEditTodo(todo);
        if (rowMap[todo.id]){
            rowMap[todo.id].closeRow();
        };
    }
    return (
        <View style={{flex:1, marginTop:60}}>
            <View style={{marginLeft:5, marginBottom:10}}>
                <VStack w="100%" space={5} alignSelf="center">
                    <Heading fontSize="2x1" >To-Do</Heading>
                    <View style={{fllexDirection:'row', marginRight:60, marginLeft:2}}>
                        <Input
                            placeholder="Enter To-Do"
                            onChangeText={text => setTodoText(text)}
                            value={todoText}
                            variant='filled'
                            width='100%'
                            borderRadius={10}
                            py="1"
                            px="2"
                            borderWidth="7"
                            InputLeftElement={<Icon ml='2' size='7' color='gray.100'
                            as={<FontAwesome5 name='pencil-alt' />} />}
                        />

                        <Button 
                            onPres={handleSubmit}
                            title={buttonTitle}
                            stylee={{height:20}}
                        />
                    </View>
                </VStack>
            </View>
            <SwipeListView
                data={state.todos}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
        </View>
    )
}
const config = {
    dependencies: {
        "linear-graident": Lineargraident
    }
};
export default () => {
    return(
        <NativeBaseProvider config={config}>
            <TodoList/>
        </NativeBaseProvider>
    )
}
const styles = StyleSheet.create({
    rowBack:{
        alignItems:'center',
        backgroundColor: '#000', 
        flex:1, 
        flexDirection:'row',
        justifyContent:'space-around',
        paddingLeft:15,
    },
    backRightbtn:{
        alignItems:'center',
        bottom:0,
        justifyContent:'center',
        position: 'absolute',
        top:0,
        width:75,
        backgroundColor: 'red',
        right:0
    }
})
