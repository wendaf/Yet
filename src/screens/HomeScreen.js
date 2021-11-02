import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, SafeAreaView, Alert} from 'react-native';
import { IconButton } from '../components';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';
import { auth } from "../firebase/firebase";
import { getDatabase, ref, set } from "firebase/database";

export default function HomeScreen() {
    const { user } = useContext(AuthenticatedUserContext);
    const [idx, incr] = useState(0);
    const [data , setData] = useState([]);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.log(error);
        }
    };
    const addInput = () => {
        setData([...data, { id: idx, text: Math.random().toString(36).substring(2,7) }])
        incr(idx + 1)
    };
    const pushToFirebase = () => {
        for(let i= 0; i < data.length; i++){
            set(ref(getDatabase(), 'inputs/' + data[i].id), {
                value: data[i].text,
            }).then(() =>
                setData([]),
            );
        }
    };
    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.row}>
                <Text style={styles.title}>Welcome {user.email}!</Text>
                <IconButton
                    name='logout'
                    size={24}
                    color='#fff'
                    onPress={handleSignOut}
                />
            </View>

            <FlatList
                keyExtractor = {item => item.id}
                data={data}
                renderItem = {item => (
                    <TextInput
                       value={item.item.text}
                       style={styles.input}
                       editable={false}
                    />
                )}
            />

            <TouchableOpacity onPress={addInput} style={styles.buttonR}>
                <Text style={styles.buttonTextR} >1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pushToFirebase} style={styles.buttonL}>
                <Text style={styles.buttonTextL} >2</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3b4ce9',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff'
    },
    text: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff'
    },
    buttonR: {
        left: 270,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#873ff4',
        width: 100,
        marginBottom: 30,
        position: 'absolute',
        bottom: 0
    },
    buttonTextR: {
        color: "white",
        textAlign: 'center',
        fontWeight: "bold"
    },
    buttonL: {
        right: 270,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#873ff4',
        width: 100,
        marginBottom: 30,
        position: 'absolute',
        bottom: 0
    },
    buttonTextL: {
        color: "white",
        textAlign: 'center',
        fontWeight: "bold"
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        width: '100%',
    }
});