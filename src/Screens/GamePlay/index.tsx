import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    Text,
    View,
} from 'react-native';
import { styles } from './styles';
import AppButton from '../../Components/AppButton';
import LogoView from '../../Components/LogoView';
import { AppImages } from '../../Assets';
import { useNavigation } from '@react-navigation/native';
import { AppConstants } from '../../Theme/constants';
import { Colors } from '../../Theme/colors';
import { Fonts } from '../../Theme/fonts';
import GamePlayField from '../../Components/GamePlayField';
import Timer from '../../Components/Timer';
import { useDispatch, useSelector } from 'react-redux';
import { AppLogger, searchInJSONFile, wordIncludesAllLetters } from '../../Theme/utils';
import { saveToWordsList, setSelectedLetters } from '../../Redux/Actions/gameActions';
import { useKeyboard } from '@react-native-community/hooks';

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
export default function GamePlay(): JSX.Element {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const keyboard = useKeyboard()
    const [fieldText, setFieldText] = useState("")
    const isProUser = useSelector(state => state.user.isProUser)
    const selectedLetters = useSelector(state => state.game.selectedLetters)
    const wordsList = useSelector(state => state.game.wordsList)
    const [message, setMessage] = useState(null)
    const selectionPermutations = useRef([])
    let messageTimeOut = null

    useEffect(() => {
        showMessage("Press return to submit word.")
        generatePermutations(selectedLetters)
    }, [])

    const generatePermutations = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                for (let k = 0; k < arr.length; k++) {
                    if (i !== j && j !== k && i !== k) {
                        selectionPermutations.current.push(arr[i] + arr[j] + arr[k]);
                    }
                }
            }
        }
    }

    const getRandomPermutation = () => {
        const randomIndex = Math.floor(Math.random() * selectionPermutations.current.length);
        dispatch(setSelectedLetters(selectionPermutations.current[randomIndex].split('')))
    }

    const onTimercomplete = () => {
        navigation.navigate(AppConstants.screens.explainationSlideTwo)
    }

    const searchInWordList = (word: string) => {
        return wordsList.find((wordFromList: string) => wordFromList.toLowerCase() === word.toLowerCase())
    }

    const onWordReceived = (word: string) => {
        const startLetter = word[0].toUpperCase()
        const wordContainsLetters = wordIncludesAllLetters(word, selectedLetters)
        console.log("Contain letters", wordContainsLetters)
        // dispatch(saveToWordsList(word))
        if (wordContainsLetters) {
            const wordListSearchResult = searchInWordList(word)
            if (!wordListSearchResult) {
                searchInJSONFile(`${startLetter}`, word.toUpperCase()).then((dictionarySearchResult) => {
                    if (dictionarySearchResult) {
                        dispatch(saveToWordsList(word.toLowerCase()))
                    } else {
                        showMessage("Not a word!")
                    }
                })
            } else {
                showMessage("Word already submitted.")
            }
        } else {
            showMessage("Words must contain the letters above")
        }
    }

    const showMessage = (displayMessage: string) => {
        if (messageTimeOut) {
            clearTimeout(messageTimeOut)
        }
        setMessage(displayMessage)
        messageTimeOut = setTimeout(() => {
            setMessage(null)
            clearTimeout(messageTimeOut)
        }, 5000)
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                marginTop: 50,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <View style={{ height: 90, width: 90, borderRadius: 45, borderWidth: 6, borderColor: Colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                    <Timer completed={onTimercomplete} />
                </View>
                <View style={{ width: 30 }} />
                <View style={{ alignItems: 'center', marginBottom: isProUser ? 40 : 0 }}>
                    {isProUser ?
                        <Pressable style={styles.shuffleView} onPress={() => { getRandomPermutation() }}>
                            <Image style={styles.shuffleIcon} source={AppImages.ShuffleIcon} />
                            <Text style={styles.shuffleText} >{'Shuffle'}</Text>
                        </Pressable> : null}
                    <View style={styles.lettersView}>
                        {
                            selectedLetters.map((letter, index) => {
                                return (
                                    <View key={index} style={styles.letterView}>
                                        <Text style={styles.letterText}>{letter}</Text>
                                    </View>
                                )
                            })
                        }
                        <View style={[styles.selectionView]} />
                    </View>
                </View>
            </View>
            <GamePlayField value={fieldText} onWordReceived={onWordReceived} onChangeText={setFieldText} placeholder={'Enter word here...'} textFieldStyle={{ width: '80%', marginTop: 30 }} />
            <View style={{ height: 165, width: '100%' }}>
                <FlatList
                    data={wordsList}
                    persistentScrollbar={false}
                    renderItem={({ item }) => <Item title={item} />}
                    style={{
                        // height: 80,
                        marginTop: 10,
                        // marginBottom: message ? 20 : keyboard.keyboardHeight + 20,
                        width: '100%',
                        // backgroundColor: 'red'
                    }}
                />
            </View>
            {
                message ? <View style={{ marginBottom: keyboard.keyboardHeight + 10 }}><Text style={styles.errorMessage}>{message}</Text></View> : null
            }

        </View >
    );
}